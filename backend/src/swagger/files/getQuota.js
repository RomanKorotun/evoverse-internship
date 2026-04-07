/**
 * @swagger
 * /api/files/quota:
 *   get:
 *     tags: [Files]
 *     summary: Отримати поточну квоту сховища
 *     description: Ендпоінт повертає поточне значення квоти файлового сховища.
 *     responses:
 *       200:
 *         description: Поточна квота успішно отримана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quota:
 *                   type: integer
 *                   example: 10485760
 *       500:
 *         description: Внутрішня помилка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server Error
 */
