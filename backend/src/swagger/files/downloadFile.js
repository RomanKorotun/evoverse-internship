/**
 * @swagger
 * /api/files/download/{filename}:
 *   get:
 *     tags: [Files]
 *     summary: Скачати файл
 *     description: Повертає файл для скачування. Для тестування завантаження також можна використовувати браузер, чи Postman.
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Ім’я файлу для скачування
 *     responses:
 *       200:
 *         description: Файл успішно відправлено
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
 *                   example: Файл example.txt не знайдено
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
 */
