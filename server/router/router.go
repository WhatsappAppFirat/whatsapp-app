package router

import (
	"whatsapp-app/internal/app/user"

	"github.com/go-redis/redis/v9"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
)

func Init(router *echo.Echo, tx *mongo.Database, client *redis.Client) {
	userHandler := user.UserInit(tx, client)

	router.POST("/register", userHandler.Register)
	router.POST("/login", userHandler.Login)
	router.POST("/send/email", userHandler.SendEmail)
	router.POST("/verify/email", userHandler.VerifyEmail)

}
