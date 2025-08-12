## CV App

Веб-приложение для создания и редактирования персонального резюме.  
Поддерживает авторизацию через GitHub и редактирование данных прямо на сайте.

### Возможности
- Просмотр резюме в виде современного одностраничного сайта
- Авторизация через **GitHub**
- Редактирование содержимого резюме через встроенный JSON-редактор

### Стек технологий
- **Next.js** — фреймворк для React
- **NextAuth.js** — авторизация через GitHub
- **CodeMirror** (`@uiw/react-codemirror`) — JSON-редактор
- **Tailwind** — стилизация

### .env.local
```env
GITHUB_ID=client_id
GITHUB_SECRET=client_secret
NEXTAUTH_SECRET=случайная_строка
NEXTAUTH_URL=http://localhost:3000
ALLOWED_EMAIL=email_пользователя_для_редактирования
