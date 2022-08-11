package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/kosnu/habook-backend/database"
	"github.com/kosnu/habook-backend/dataloader"
	"github.com/kosnu/habook-backend/graph"
	"github.com/kosnu/habook-backend/graph/generated"
)

const defaultPort = "8080"

func main() {
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dsn := dbUser + ":" + dbPassword + "@tcp(" + dbHost + ":3306)/habook?charset=utf8mb4&parseTime=True&loc=Local"

	db, err := database.ConnectDatabase(dsn)
	if err != nil {
		panic(err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{DB: db}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", dataloader.Middleware(db, srv))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
