import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const PORT_EXTERNAL = process.env.PORT_EXTERNAL;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "File Storage API",
      version: "1.0.0",
      description: "API для роботи з файлами ",
      contact: {
        name: "File Storage API Maintainers",
        url: "https://github.com/RomanKorotun/evoverse-internship/tree/hw-3",
        email: "roman.korotun@ukr.net",
      },
    },
    servers: [
      {
        url: `http://127.0.0.1:${PORT_EXTERNAL}`,
        description: "Локальний сервер",
      },
    ],
  },
  apis: ["./src/modules/**/*.js", "./src/swagger/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
