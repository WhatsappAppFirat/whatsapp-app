package user

import (
	"whatsapp-app/internal/repository"
	"whatsapp-app/internal/service"
	UserService "whatsapp-app/internal/service/user"
	utils "whatsapp-app/internal/utils"

	"go.mongodb.org/mongo-driver/mongo"
)

func UserInit(db *mongo.Database) IUserHandler {
	utils := utils.NewUtils()
	repository := repository.NewUserRepository(db)
	service := UserService.NewUserService(repository, service.Service{Utils: utils})
	handler := NewUserHandler(service, utils)
	return handler
}
