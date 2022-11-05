FROM golang:1.17-alpine

ENV ROOT=/go/src/app
WORKDIR ${ROOT}

RUN apk update && apk add --no-cache git build-base

RUN go install -tags 'mysql' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

COPY . .

RUN go mod tidy

EXPOSE 8080

CMD ["go","run", "server.go"]
