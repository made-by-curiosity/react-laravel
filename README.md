To run this project you need Docker and Docker Compose installed. Also to execute shorter commands you'll need to use `make`. List of example commands you can find in Makefile. 

1. Git clone this project
2. Clone .env.example to .env and fill it with your data
3. Run ```make up``` to run all containers or ```docker compose up -d```
4. Run db migrations ```make migrate``` or ```docker compose --rm artisan migrate```
5. To execute composer commands run ```make compose cmd="your command"``` or ```docker compose --rm composer your_command```
6. To execute artisan commands run ```make artisan cmd="your command"``` or ```docker compose --rm artisan your_command```