import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Break Furniture API",
    version: "1.0.0",
    description: "API documentation for Break Furniture application",
    contact: {
      name: "API Support",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
    {
      url: "https://arabic-react1.vercel.app",
      description: "Production server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter JWT token",
      },
    },
    schemas: {
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
            description: "Error message",
          },
        },
      },
      Success: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Success message",
          },
        },
      },
    },
  },
  tags: [
    {
      name: "Authentication",
      description: "User authentication endpoints",
    },
    {
      name: "Products",
      description: "Product management endpoints",
    },
    {
      name: "Categories",
      description: "Category management endpoints",
    },
    {
      name: "Cart",
      description: "Shopping cart endpoints",
    },
    {
      name: "Reservations",
      description: "Reservation management endpoints",
    },
    {
      name: "Users",
      description: "User management endpoints",
    },
    {
      name: "Messages",
      description: "Message management endpoints",
    },
    {
      name: "Content",
      description: "Content management endpoints (Hero, Main, About Us, Contact Us, Header/Footer)",
    },
    {
      name: "Upload",
      description: "File upload endpoints",
    },
    {
      name: "Health",
      description: "Health check endpoints",
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/index.ts"], // Path to the API routes
};

export const swaggerSpec = swaggerJsdoc(options);

