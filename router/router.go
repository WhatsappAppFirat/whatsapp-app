package router

import (
	"whatsapp-app/internal/app/user"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
)

func Init(router *echo.Echo, tx *mongo.Database) {
	userHandler := user.UserInit(tx)

	router.POST("/register", userHandler.Register)
}
