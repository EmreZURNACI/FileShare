package main

import (
	r "FileTransferServer/Routers"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	_mux := mux.NewRouter()
	auth := _mux.PathPrefix("/auth").Subrouter()
	file := _mux.PathPrefix("/file").Subrouter()
	r.AuthRouter(auth)
	r.FileRouter(file)
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodOptions},
		AllowCredentials: true,
	})

	handler := c.Handler(_mux)
	http.ListenAndServe(":8080", handler)
}
