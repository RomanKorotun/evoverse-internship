/**
 * @swagger
 * /api/files/{filename}:
 *   get:
 *     tags: [Files]
 *     summary: Переглянути файл
 *     description: |
 *       Повертає файл для перегляду у браузері.
 *       Використовує підтримку Range для потокового відтворення.
 *       ⚠️ Не натискати "Try it out" у Swagger UI для цього ендпойнта.
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Ім’я файлу для перегляду
 *     responses:
 *       200:
 *         description: Файл успішно відправлено
 *         content:
 *           video/mp4:
 *             schema:
 *               type: string
 *               format: binary
 *           audio/mpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       206:
 *         description: Частковий контент (для стрімінгу)
 *         content:
 *           video/mp4:
 *             schema:
 *               type: string
 *               format: binary
 *           audio/mpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Некоректне ім’я файлу
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Некоректне ім’я файлу
 *       404:
 *         description: Файл не знайдено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Файл example.mp4 не знайдено
 *       500:
 *         description: Внутрішня помилка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Помилка при перегляді файла
 *     x-no-try: true
 */
