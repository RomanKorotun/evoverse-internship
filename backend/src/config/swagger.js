import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "File Storage API",
      version: "1.0.0",
      description: "API для роботи з файлами ",
      contact: {
        name: "File Storage API Maintainers",
        url: "https://github.com/RomanKorotun/evoverse-internship/tree/hw-2",
        email: "roman.korotun@ukr.net",
      },
    },
    servers: [
      {
        url: "http://localhost:3030",
        description: "Локальний сервер",
      },
    ],
  },
  apis: ["./src/modules/**/*.js", "./src/swagger/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
