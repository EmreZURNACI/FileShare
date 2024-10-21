package Routers

import (
	f "FileTransferServer/Functions"
	md "FileTransferServer/Middleware"
	m "FileTransferServer/Models"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
)

func FileRouter(_mux *mux.Router) {
	_mux.Use(md.IsMethodPost)
	_mux.HandleFunc("/uploadfile", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		data, res := f.FormData(r)
		if data == nil {
			f.RespondWithJSON(w, res)
			return
		}
		path := f.UserPath()
		if path.Status == false {
			f.RespondWithJSON(w, path)
			return
		}
		msg := f.CreateFolder(path.Message, data.Value["email"])
		if msg.Status == false {
			f.RespondWithJSON(w, msg)
			return
		}
		files := f.CreateFiles(data, path.Message)
		if files.Status == false {
			f.RespondWithJSON(w, files)
			return
		}
		f.RespondWithJSON(w, m.ResponseModel{Status: true, StatusCode: 200, Message: "Dosyalar başarıyla yüklendi"})
	})
	_mux.HandleFunc("/listfiles", func(w http.ResponseWriter, r *http.Request) {
		auth := m.Auth{}
		bs, err := ioutil.ReadAll(r.Body)
		if err != nil {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 400, Message: "Email adresi olmak zorunda"})
			return
		}

		err = json.Unmarshal(bs, &auth)
		if err != nil {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 400, Message: "Email adresi olmak zorunda"})
			return
		}
		path := f.UserPath()
		if path.Status == false {
			f.RespondWithJSON(w, path)
			return
		}

		directoryPath := filepath.Join(path.Message, "Desktop", "Dosyalanacaklar", auth.Email)
		files, err3 := os.ReadDir(directoryPath)
		if err3 != nil {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 400, Message: "Kullanıcıya ait yüklenmiş dosya bulunmamaktadır"})
			return
		}
		fileNames := []string{}
		for _, item := range files {
			fileNames = append(fileNames, item.Name())
		}
		f.RespondWithJSON(w, m.ResponseModel{Status: true, StatusCode: 200, Message: "Dosyalar getiriliyor", Files: fileNames})
	})
	_mux.HandleFunc("/downloadfile", func(w http.ResponseWriter, r *http.Request) {
		body := m.DownFile{}
		bs, err := ioutil.ReadAll(r.Body)
		if err != nil {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 400, Message: "Email adresi olmak zorunda"})
			return
		}

		err = json.Unmarshal(bs, &body)
		if err != nil {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 400, Message: "Email adresi olmak zorunda"})
			return
		}

		path := f.UserPath()
		if path.Status == false {
			f.RespondWithJSON(w, path)
			return
		}
		var file string = path.Message + "/Desktop/Dosyalanacaklar/" + body.Email + "/" + body.Filename
		w.Header().Set("Content-Type", "text/plain")
		http.ServeFile(w, r, file)
	})
	_mux.HandleFunc("/getfiles", func(w http.ResponseWriter, r *http.Request) {
		auth := m.Auth{}
		bs, err := ioutil.ReadAll(r.Body)
		if err != nil {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 400, Message: "Email adresi olmak zorunda"})
			return
		}

		err = json.Unmarshal(bs, &auth)
		if err != nil {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 400, Message: "Email adresi olmak zorunda"})
			return
		}

		path := f.UserPath()
		if path.Status == false {
			f.RespondWithJSON(w, path)
			return
		}
		directoryPath := filepath.Join(path.Message, "Desktop", "Dosyalanacaklar", auth.Email)
		files, err3 := os.ReadDir(directoryPath)
		if err3 != nil {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 500, Message: "Kullanıcıya ait yüklenmiş dosya bulunmamaktadır."})
			return
		}
		fileNames := make([]string, 0, len(files))
		for _, item := range files {
			fileNames = append(fileNames, filepath.Join(directoryPath, item.Name()))
		}

		zipFilePath := filepath.Join(path.Message, "Desktop", auth.Email+".zip")
		if err := f.ZipFiles(zipFilePath, fileNames); err != nil {
			f.RespondWithJSON(w, m.ResponseModel{Status: false, StatusCode: 500, Message: "Zip dosyası oluşturulamadı."})
			return
		}

		w.Header().Set("Content-Type", "application/zip")
		w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=%s", filepath.Base(zipFilePath)))
		http.ServeFile(w, r, zipFilePath)
	})
}
