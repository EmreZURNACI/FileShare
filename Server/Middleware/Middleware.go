package Middleware

import (
	f "FileTransferServer/Functions"
	m "FileTransferServer/Models"
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

func IsMethodPost(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		if r.Method != http.MethodPost {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 400, Message: "İstenilen method ile gelinmedi"})
			return
		}
		next.ServeHTTP(w, r)

	})
}
func IsBodyEmpty(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		if r.Body == http.NoBody || r.Body == nil {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 400, Message: "Body boş olamaz"})
			return
		}

		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 500, Message: "Body okunamadı"})
			return
		}
		defer r.Body.Close()

		if len(body) == 0 || string(body) == "{}" {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 400, Message: "Body boş olamaz"})
			return
		}
		var auth m.Auth
		err = json.Unmarshal(body, &auth)
		if err != nil {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 500, Message: "Body parse edilemedi"})
			return
		}
		if auth.Password == "" || auth.Email == "" {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 400, Message: "Inputları doldurmalısın"})
			return
		}
		ctx := context.WithValue(r.Context(), "auth", auth)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
