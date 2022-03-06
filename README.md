## Steps to setup repository

- Clone a repository
- cd todo-list/
- run composer install
- run npm install
- run npm run dev
- Rename .env.example to .env (mv .env.example .env)
- Run touch database/database.sqlite
- Set DB_DATABASE to absolute path of the file database.sqlite (For e.g: /var/www/html/todo-list/database/database.sqlite)
- Run migration php artisan migrate
- run php artisan serve
- Follow - [Todo App](http://localhost:8000/).
