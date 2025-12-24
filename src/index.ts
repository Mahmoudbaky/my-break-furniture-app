import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import {
  productRoutes,
  categoryRoutes,
  cartRoutes,
  authRoutes,
  reservationRoutes,
  userRoutes,
  messageRoutes,
  heroContentRoutes,
  mainContentRoutes,
  aboutusContentRoutes,
  contactusContentRoutes,
  headerFooterContentRoutes,
  reservationContactSettingsRoutes,
} from "./routes/index.js";
import { env } from "./config/env.js";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./config/uploadthing.js";
import { swaggerSpec } from "./config/swagger.js";

dotenv.config();

// Connect to MongoDB
await mongoose
  .connect(env.MONGODB_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const app = express();

// CORS configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    const allowedOrigins = [
      "https://arabic-react1.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5173",
    ];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Accept",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Headers",
    "x-uploadthing-package",
    "x-uploadthing-version",
    "traceparent",
    "user-agent",
    "b3",
    "referer",
    "sec-ch-ua",
    "sec-ch-ua-mobile",
    "sec-ch-ua-platform",
  ],
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Swagger documentation
// Use CDN assets for Vercel compatibility (serverless functions can't serve static files from node_modules)
const swaggerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Break Furniture API Documentation</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui.css" />
  <style>
    .swagger-ui .topbar { display: none }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      const spec = ${JSON.stringify(swaggerSpec)};
      SwaggerUIBundle({
        spec: spec,
        dom_id: '#swagger-ui',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "StandaloneLayout",
        persistAuthorization: true
      });
    };
  </script>
</body>
</html>
`;

app.get("/api-docs", (req, res) => {
  res.send(swaggerHtml);
});

app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/hero-content", heroContentRoutes);
app.use("/api/main-content", mainContentRoutes);
app.use("/api/aboutus-content", aboutusContentRoutes);
app.use("/api/contactus-content", contactusContentRoutes);
app.use("/api/headerfooter-content", headerFooterContentRoutes);
app.use("/api/reservation-contact-settings", reservationContactSettingsRoutes);

// Uploadthing routes
app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: { token: env.UPLOADTHING_TOKEN },
  })
);

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Server is healthy
 */
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is healthy" });
});

// Handle 404 - catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found, please use a valid endpoint",
  });
});

app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});

export default app;
