
DB_HOST=localhost
DB_PORT=3306
DB_USER=habook
DB_PASSWORD=habook
DB_NAME=habook
DB_CONN=mysql://${DB_USER}:${DB_PASSWORD}@tcp\(${DB_HOST}:${DB_PORT}\)/${DB_NAME}

run:
	docker compose up -d --build

start:
	go run ./server.go

gqlgen:
	go run github.com/99designs/gqlgen generate

dataloaden:
	go run github.com/vektah/dataloaden ${MODEL_NAME}Loader string *github.com/kosnu/graph/mode.${MODEL_NAME}

create-migration:
	migrate create -ext sql -dir database/migrations ${NAME}

migrate-up:
	migrate --source file://database/migrations --database ${DB_CONN} up

migrate-down:
	migrate --source file://database/migrations --database ${DB_CONN} down 1

migrate-force:
	migrate --path database/migrations/ --database ${DB_CONN} force ${VERSION}
