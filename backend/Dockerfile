FROM golang:1.21

ENV ROOT=/go/src/app
WORKDIR ${ROOT}

RUN go install -tags 'mysql' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

COPY . .

RUN go mod tidy

EXPOSE 8080

CMD ["go","run", "server.go"]
