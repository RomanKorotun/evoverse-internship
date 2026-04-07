/**
 * @swagger
 * /api/files/stats:
 *   get:
 *     tags: [Files]
 *     summary: Отримати статистику сховища
 *     description: |
 *       Ендпоінт повертає інформацію про використання файлового сховища:
 *       - квоту у байтах
 *       - загальний розмір завантажених файлів у байтах
 *       - кількість файлів
 *     responses:
 *       200:
 *         description: Статистика сховища успішно отримана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quotaBytes:
 *                   type: integer
 *                   example: 10485760
 *                 totalSizeBytes:
 *                   type: integer
 *                   example: 78629
 *                 filesCount:
 *                   type: integer
 *                   example: 2
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
