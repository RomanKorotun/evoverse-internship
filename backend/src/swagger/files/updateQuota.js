/**
 * @swagger
 * /api/files/quota:
 *   put:
 *     tags: [Files]
 *     summary: Оновити квоту для сховища
 *     description: Ендпоінт дозволяє змінити обсяг квоти для файлового сховища.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quota:
 *                 type: integer
 *                 example: 10485760
 *     responses:
 *       200:
 *         description: Квота успішно встановлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quota:
 *                   type: integer
 *                   example: 10485760
 *       400:
 *         description: Некоректні дані у запиті
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Відсутнє тіло запиту або некоректні значення полів

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
