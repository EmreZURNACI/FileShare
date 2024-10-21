package Connection

import (
	m "FileTransferServer/Models"
	"database/sql"
	"encoding/json"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

var c m.Con

func init() {
	bs, err := os.ReadFile("config.json")
	if err != nil {
		fmt.Println("HATA")
		return
	}
	err = json.Unmarshal(bs, &c)
	if err != nil {
		fmt.Println("HATA")
		return
	}
}
func Connection() (*sql.DB, error) {
	var dsn string = fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s", c.Hostname, c.Port, c.User, c.Password, c.Database)
	con, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, err
	}
	err = con.Ping()
	if err != nil {
		return nil, err
	}
	return con, nil
}
