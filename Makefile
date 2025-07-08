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

generate-key:
	docker compose run --rm artisan key:generate

# 📦 Composer

composer:
	docker compose run --rm composer $(cmd)

composer-install:
	docker compose run --rm composer install


# fresh start

init: prepare-env composer-install generate-key migrate

prepare-env:
	@if [ ! -f ./application/.env ]; then \
		cp ./application/.env.example ./application/.env && \
		echo ".env created"; \
	else \
		echo ".env already exists"; \
	fi
