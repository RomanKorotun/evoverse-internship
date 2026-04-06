/**
 * @swagger
 * /api/files:
 *   get:
 *     tags: [Files]
 *     summary: Отримати список файлів
 *     description: Ендпоінт повертає список усіх файлів, що збережені у файловому сховищі.
 *     responses:
 *       200:
 *         description: Список файлів успішно отримано
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 files:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "file1.jpg"
 *                       sizeBytes:
 *                         type: integer
 *                         example: 78629
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-03-29T10:05:27.565Z"
 *       500:
 *         description: Внутрішня помилка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Помилка при отриманні списку файлів"
 */
