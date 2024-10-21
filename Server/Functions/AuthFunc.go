package Functions

import (
	c "FileTransferServer/Connection"
	m "FileTransferServer/Models"

	i "github.com/google/uuid"
)

func CreateUser(u m.Auth) (res m.ResponseModel) {
	con, err := c.Connection()
	if err != nil {
		return ErrorResponse("Veri tabanı ile bağlantı kurulamadı.", 400)
	}
	defer con.Close()

	uuid, _ := i.NewV7()
	query, err := con.Exec("SELECT * FROM public.user WHERE email=$1;", u.Email)
	if err != nil {
		return ErrorResponse("Veri tabanı sorgusu çalıştırılamadı.", 400)
	}
	count, err := query.RowsAffected()
	if err != nil {
		return ErrorResponse("Hata oluştu.", 500)
	}
	if count > 0 {
		return ErrorResponse("Bu email adresine sahip bir kullanıcı mevcut.", 400)
	}
	queryRes := con.QueryRow("INSERT INTO public.user (uuid,email,password) VALUES ($1,$2,$3);", uuid.String(), u.Email, HashPassword(u.Password))
	if queryRes.Err() != nil {
		return ErrorResponse("Veri tabanı sorgusu çalıştırılamadı.", 400)
	}
	return SuccessResponse("Kullanıcı kaydedildi.")
}

func Login(u m.Auth) (res m.ResponseModel) {
	con, err := c.Connection()
	if err != nil {
		return ErrorResponse("Veri tabanı ile bağlantı kurulamadı.", 400)
	}
	defer con.Close()

	queryRes, err := con.Exec("SELECT * FROM public.user WHERE email=$1 AND password=$2;", u.Email, HashPassword(u.Password))
	if err != nil {
		return ErrorResponse("Veri tabanı sorgusu çalıştırılamadı.", 400)
	}

	count, err := queryRes.RowsAffected()
	if err != nil {
		return ErrorResponse("Hata oluştu.", 500)
	}

	if count == 0 {
		return ErrorResponse("Kullanıcı bulunmamaktadır.\n "+
			"ya da email veya şifre yanlış.", 400)
	}

	return SuccessResponse("Giriş başarılı.")
}
