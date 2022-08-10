DB_HOST=db
DB_PORT=3306
DB_USER=habook
DB_PASSWORD=habook
DB_NAME=habook
DB_CONN=mysql://${DB_USER}:${DB_PASSWORD}@tcp\(${DB_HOST}:${DB_PORT}\)/${DB_NAME}
run:
	docker compose build

start:
	docker compose up -d

stop:
	docker compose down

gqlgen:
	docker compose exec app go run github.com/99designs/gqlgen generate

dataloaden:
	docker compose exec app go run github.com/vektah/dataloaden ${MODEL_NAME}Loader string *github.com/kosnu/habook-backend/graph/mode.${MODEL_NAME}

create-migration:
	docker compose exec app migrate create -ext sql -dir database/migrations ${NAME}

migrate-up:
	docker compose exec app migrate -database ${DB_CONN} -path database/migrations up

migrate-down:
	docker compose exec app migrate -database ${DB_CONN} -path database/migrations down 1

migrate-force:
	docker compose exec app migrate -database ${DB_CONN} -path database/migrations force ${VERSION}
