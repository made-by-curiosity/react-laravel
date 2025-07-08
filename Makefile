# 🐳 Docker Compose Commands

up:
	docker compose up -d

down:
	docker compose down

compose:
	docker compose $(cmd)

# ⚛️ React

build-react:
	docker compose build react-webserver

up-react:
	docker compose up -d react-webserver

restart-react: build-react up-react

# 🧰 Laravel Artisan

artisan:
	docker compose run --rm artisan $(cmd)

migrate:
	docker compose run --rm artisan migrate

# 📦 Composer

composer:
	docker compose run --rm composer $(cmd)