package Functions

import (
	m "FileTransferServer/Models"
	"io"
	"mime/multipart"
	"net/http"
	"os"
)

func FormData(r *http.Request) (*multipart.Form, m.ResponseModel) {
	if err := r.ParseMultipartForm(10 << 15); err != nil {
		return nil, ErrorResponse("Form işlenemedi", 500)
	}

	files := r.MultipartForm.File["files"]
	if len(files) == 0 {
		return nil, ErrorResponse("Hiç dosya yüklenmedi", 400)
	}
	email := r.MultipartForm.Value["email"]
	if len(email) == 0 || email[0] == "" {
		return nil, ErrorResponse("E-posta boş olamaz", 400)
	}

	password := r.MultipartForm.Value["password"]
	if len(password) == 0 || password[0] == "" {
		return nil, ErrorResponse("Şifre boş olamaz", 400)
	}
	return r.MultipartForm, SuccessResponse("Form işlendi.")
}
func UserPath() m.ResponseModel {
	userPath, err := os.UserHomeDir()
	if err != nil {
		return ErrorResponse("Kullanıcı pathi alınamadı", 500)
	}
	return SuccessResponse(userPath)
}
func CreateFolder(path string, emails []string) m.ResponseModel {
	if err := os.MkdirAll(path+"/Desktop/Dosyalanacaklar/"+emails[0], 0700); err != nil {
		return ErrorResponse("Klasör oluşturulamadı", 500)
	}
	return SuccessResponse("Dosya oluşturuldu")
}
func CreateFiles(data *multipart.Form, path string) m.ResponseModel {
	for _, file := range data.File["files"] {
		_file, err := file.Open()
		if err != nil {
			return ErrorResponse("Dosya açılamadı", 500)
		}
		defer _file.Close()

		dir := path + "/Desktop/Dosyalanacaklar/" + data.Value["email"][0]
		if err := os.MkdirAll(dir, os.ModePerm); err != nil {
			return ErrorResponse("Klasör oluşturulamadı", 500)
		}

		newFilePath := dir + "/" + file.Filename
		newFile, err := os.Create(newFilePath)
		if err != nil {
			return ErrorResponse("Dosya açılamadı", 500)
		}
		defer newFile.Close()

		if _, err := io.Copy(newFile, _file); err != nil {
			return ErrorResponse("Dosya kaydedilemedi", 500)
		}

		if err := newFile.Chmod(0700); err != nil {
			return ErrorResponse("Dosya izinleri ayarlanamadı", 500)
		}
	}
	return SuccessResponse("Doyalar oluşturuldu")
}
