/**
 * @swagger
 * /api/files/{filename}:
 *   delete:
 *     tags: [Files]
 *     summary: Видалити файл зі сховища
 *     description: Ендпоінт дозволяє видалити файл за його ім'ям. Ім'я файлу має відповідати регулярному виразу ^[\\p{L}\\p{N}._-]+$ (лише літери, цифри, крапки, підкреслення та дефіси).
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Ім'я файлу зі сховища (з префіксом), що відповідає FILENAME_REGEX
 *     responses:
 *       200:
 *         description: Файл успішно видалений
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Файл 1775459709419-example.txt успішно видалений
 *       400:
 *         description: Некоректне ім’я файлу (не відповідає регулярному виразу)
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
 *                   example: Файл 1775459709419-example.txt не знайдено
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
