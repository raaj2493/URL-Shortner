import express from "express";
import jwt from "jsonwebtoken"; // ✅ Correct import
import { db } from "../DB/index.js";
import { usersTable } from "../Model/index.js";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { SignUpPostSchema, SignInPostSchema } from "../Utils/request.validation.js";
import { hashPassword } from "../Utils/hash.js";
import { getUserByEmail } from "../Services/users.services.js";

const router = express.Router();

// ---------------------- SIGN UP ----------------------
router.post("/signup", async (req, res) => {
  try {
    const validationResult = await SignUpPostSchema.safeParseAsync(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        message: validationResult.error.errors[0].message,
      });
    }

    const { firstname, lastname, email, password } = validationResult.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const { salt, password: hashedPassword } = hashPassword(password);

    await db.insert(usersTable).values({
      firstname,
      lastname,
      email,
      salt,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// ---------------------- LOGIN ----------------------
router.post("/login", async (req, res) => {
  try {
    const validationResult = await SignInPostSchema.safeParseAsync(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        message: validationResult.error.errors[0].message,
      });
    }

    const { email, password } = validationResult.data;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const { salt, password: hashedPassword } = user;
    const inputHashedPassword = hashPassword(password, salt).password;

    if (hashedPassword !== inputHashedPassword) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // optional
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// Optional: For testing in browser (GET route)
router.get("/login", (req, res) => {
  res.send("<h2>Login route works! Use POST to log in.</h2>");
});

export default router;
