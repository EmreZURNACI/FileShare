package Routers

import (
	f "FileTransferServer/Functions"
	md "FileTransferServer/Middleware"
	m "FileTransferServer/Models"
	"net/http"

	"github.com/gorilla/mux"
)

func AuthRouter(_mux *mux.Router) {
	_mux.Use(md.IsMethodPost)
	_mux.Use(md.IsBodyEmpty)

	_mux.HandleFunc("/signin", func(w http.ResponseWriter, r *http.Request) {
		auth, err := f.ExtractAuth(r)
		if err != "" {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 500, Message: err})
			return
		}
		res := f.Login(auth)
		f.RespondWithJSON(w, res)
	})
	_mux.HandleFunc("/signup", func(w http.ResponseWriter, r *http.Request) {
		auth, err := f.ExtractAuth(r)
		if err != "" {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 500, Message: err})
			return
		}
		res := f.CreateUser(auth)
		f.RespondWithJSON(w, res)
	})
}
