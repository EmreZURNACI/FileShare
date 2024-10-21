package Functions

import (
	m "FileTransferServer/Models"
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
)

func ErrorResponse(message string, statusCode int) m.ResponseModel {
	return m.ResponseModel{Status: false, StatusCode: statusCode, Message: message}
}

func SuccessResponse(message string) m.ResponseModel {
	return m.ResponseModel{Status: true, StatusCode: 200, Message: message}
}
func RespondWithJSON(w http.ResponseWriter, data interface{}) {
	response, _ := json.MarshalIndent(data, "", " ")
	fmt.Fprintln(w, string(response))
}

func ExtractAuth(r *http.Request) (m.Auth, string) {
	ctxValue := r.Context().Value("auth")
	if ctxValue == nil {
		return m.Auth{}, "Sunucu hatası"
	}
	auth, ok := ctxValue.(m.Auth)
	if !ok {
		return m.Auth{}, "Sunucu hatası"
	}
	return auth, ""
}
func HashPassword(pas string) string {
	hasher := md5.New()
	hasher.Write([]byte(pas))
	hashBytes := hasher.Sum(nil)
	hashString := hex.EncodeToString(hashBytes)
	return hashString
}
