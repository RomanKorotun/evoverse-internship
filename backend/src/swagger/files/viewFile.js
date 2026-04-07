/**
 * @swagger
 * /api/files/{filename}:
 *   get:
 *     tags: [Files]
 *     summary: Переглянути файл
 *     description: |
 *       Повертає файл для перегляду у браузері.
 *       Підтримує Range-запити для потокового відтворення.
 *       Тут можна переглянути різні статуси відповіді.
 *       ⚠️ Не натискати "Try it out" у Swagger UI для цього ендпойнта. Потрібно робити запит у браузері і переглядати необхідну інформацію в інструментах розробника.
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Ім’я файлу для перегляду
 *     responses:
 *       200:
 *         description: Файл повністю відправлено
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       206:
 *         description: Частковий контент (для стрімінгу)
 *         content:
 *           application/octet-stream:
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
 *                   example: Server error
 *     x-no-try: true
 */
