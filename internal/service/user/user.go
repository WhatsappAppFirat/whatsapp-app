package user

import (
	"context"
	"whatsapp-app/dto/request"
	"whatsapp-app/dto/response"
)

type IUserService interface {
	Register(ctx context.Context, userRegisterRequest request.UserRegisterDTO) (response.UserRegisterDTO, error)
}

/*type UserService struct {
	//repository userRepo.IUserRepository
	service.Service
}

func NewUserService(repository userRepo.IUserRepository, service service.Service) IUserService {
	return &UserService{repository: repository, Service: service}
}*/
