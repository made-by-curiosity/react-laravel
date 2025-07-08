# 🐳 Docker Compose Commands

fresh-build:
	docker compose build --no-cache

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

generate-key:
	docker compose run --rm artisan key:generate

# 📦 Composer

composer:
	docker compose run --rm composer $(cmd)

composer-install:
	docker compose run --rm composer install

# Fresh start

init: prepare-env fresh-build

prepare-env:
	@if [ ! -f .env ]; then \
		cp .env.example .env && \
		echo ".env created"; \
	else \
		echo ".env already exists"; \
	fi

laravel-init: prepare-laravel-env composer-install generate-key migrate

prepare-laravel-env:
	@if [ ! -f ./application/.env ]; then \
		cp ./application/.env.example ./application/.env && \
		echo "laravel .env created"; \
	else \
		echo "laravel .env already exists"; \
	fi
