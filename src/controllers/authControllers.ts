import User from "../models/user.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { CookieOptions } from "express";
import { env } from "../config/env.js";
import { registerValidationSchema } from "../validators/authValidators.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const validationResponse = registerValidationSchema.safeParse(req.body);

    if (!validationResponse.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        errors: validationResponse.error.format(),
      });
    }

    const { email, password, username, phone } = validationResponse.data;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      email,
      password: hashedPassword,
      username,
      phone,
    });

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      env.JWT_SECRET as string,
      { expiresIn: env.JWT_EXPIRES_IN } as SignOptions
    );

    // Set cookie
    const cookieOptions: CookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
    };
    res.cookie("jwt", token, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        email: user.email,
        username: user.username,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    let token;

    // Check if token exists in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify token (allow expired tokens for refresh)
    let decoded;
    try {
      // First try normal verification
      decoded = jwt.verify(token, env.JWT_SECRET as string) as {
        id: string;
        email: string;
        role: string;
      };
    } catch (error) {
      // If token is expired, verify with ignoreExpiration to check signature
      if (error instanceof jwt.TokenExpiredError) {
        try {
          decoded = jwt.verify(token, env.JWT_SECRET as string, {
            ignoreExpiration: true,
          }) as {
            id: string;
            email: string;
            role: string;
          };
        } catch (verifyError) {
          return res.status(401).json({
            success: false,
            message: "Invalid token signature",
          });
        }
      } else {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }
    }

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    // Generate new token
    const newToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      env.JWT_SECRET as string,
      { expiresIn: env.JWT_EXPIRES_IN } as SignOptions
    );

    // Set cookie
    const cookieOptions: CookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
    };
    res.cookie("jwt", newToken, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      token: newToken,
      user: {
        email: user.email,
        username: user.username,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
