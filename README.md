Evoverse Internship
homework-1

Спочатку потрібно клонувати репозиторій на свій локальний комп'ютер: git clone url-репозиторія
Запустити Docker. Відкрийте термінал у корені проєкту та виконайте команду: docker compose up --build
Заходимо в контенейр docker exec -it назва контейнера sh

1. Демонстрація Event Loop.
   1.1. Запускаємо в контейнері node event-loop-examples/event-loop.js

2. Блокування Event Loop.
   2.1. Запускаємо в контейнері node event-loop-examples/blocking.js

3. Підключення worker, щоб не блокувати основний потік
   3.1. Запускаємо в контейнері node event-loop-examples/non-blocking/main.js

4. Запуск кластера.
   4.1. Запускаємо сервер у контейнері node server-cluster/server.js
   4.2. Заходимо з іншого терміналі в контенейр docker exec -it назва контейнера sh
   4.3. Запускаємо монітор процесів top. Тут видно, як кластер розподіляє запити між воркерами та навантаження на CPU.
   4.4. Імітуємо одночасні запити з нового терміналу
   ```bash
   for i in {1..50}; do
    curl -s http://localhost:3030/ &
   done
   wait
   ```
