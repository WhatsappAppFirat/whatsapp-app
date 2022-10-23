package main

import (
	"whatsapp-app/internal/config/db"
	"whatsapp-app/router"

	"github.com/labstack/echo/v4"
)

func init() {
	db.Connect()
}

func main() {

	db := db.Connect()
	e := echo.New()
	router.Init(e, db)
	e.Logger.Fatal(e.Start(":8080"))

}
