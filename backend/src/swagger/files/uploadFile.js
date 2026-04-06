/**
 * @swagger
 * /api/files:
 *   post:
 *     tags: [Files]
 *     summary: Завантажити файл у сховище
 *     description: Ендпоінт дозволяє завантажити новий файл у файлове сховище.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Файл успішно завантажено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Файл example.txt успішно завантажено"
 *       413:
 *         description: Перевищено квоту або ліміт розміру
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Перевищено квоту сховища"
 *       500:
 *         description: Внутрішня помилка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Помилка при завантаженні файла"
 */
