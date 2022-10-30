package router

import (
	"whatsapp-app/internal/app/user"
	configs "whatsapp-app/internal/config"
	"whatsapp-app/internal/middlewares"

	"github.com/go-redis/redis/v9"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"go.mongodb.org/mongo-driver/mongo"
)

func Init(router *echo.Echo, tx *mongo.Database, client *redis.Client) {
	userHandler := user.UserInit(tx, client)

	router.POST("/register", userHandler.Register)
	router.POST("/login", userHandler.Login)

	email := router.Group("/mail")
	email.POST("/send", userHandler.SendEmail)
	email.POST("/verify", userHandler.VerifyEmail)

	auth := router.Group("")

	auth.Use(middleware.JWTWithConfig(configs.JWTConfigApp))
	auth.Use(middlewares.VerifyToken)

}
