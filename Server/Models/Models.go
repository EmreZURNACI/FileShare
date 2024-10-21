package Models

type Auth struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
type Con struct {
	Hostname string `json:"host"`
	Port     int    `json:"port"`
	User     string `json:"user"`
	Password string `json:"password"`
	Database string `json:"dbname"`
}
type ResponseModel struct {
	Status     bool     `json:"status"`
	StatusCode int      `json:"statusCode"`
	Message    string   `json:"message"`
	Files      []string `json:"files"`
}
type DownFile struct {
	Email    string `json:"email"`
	Filename string `json:"filename"`
}
