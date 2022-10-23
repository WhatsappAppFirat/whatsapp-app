package user

import (
	"context"
	"errors"
	"strconv"
	"strings"
	"whatsapp-app/dto/request"
	"whatsapp-app/dto/response"
	"whatsapp-app/internal/repository"
	"whatsapp-app/internal/service"
	models "whatsapp-app/model"
)

type IUserService interface {
	Register(ctx context.Context, userRegisterRequest request.UserRegisterDTO) (response.UserRegisterDTO, error)
}

type UserService struct {
	repository repository.IUserRepository
	service.Service
}

func NewUserService(repository repository.IUserRepository, service service.Service) IUserService {
	return &UserService{repository: repository, Service: service}
}

func (s *UserService) Register(ctx context.Context, userRegisterRequest request.UserRegisterDTO) (response.UserRegisterDTO, error) {

	findSchoolID := strings.Split(userRegisterRequest.Email, "@")
	var school_id int

	school_id, err := strconv.Atoi(findSchoolID[0])
	if err != nil {
		return response.UserRegisterDTO{}, errors.New("Kullanıcı oluşturlamadı lütfen tekrar deneyiniz")
	}

	isExist := s.repository.IsDuplicateSchoolID(int32(school_id))
	if isExist {
		return response.UserRegisterDTO{}, errors.New("Kayıt olmak istediğiniz kullanıcı zaten var.")
	}

	var hashPassword string
	hashPassword, err = s.Utils.GeneratePassword(userRegisterRequest.Password)
	if err != nil {
		err := errors.New("Şifre oluşturulamadı.")
		return response.UserRegisterDTO{}, err
	}

	passwordControl := s.Utils.EqualPassword(hashPassword, userRegisterRequest.Password)
	if !passwordControl {
		return response.UserRegisterDTO{}, errors.New("Şifre doğru bir şekilde oluşturulamadı.")
	}

	newUser := models.User{
		Name:     userRegisterRequest.Name,
		Surname:  userRegisterRequest.Surname,
		Password: hashPassword,
		SchoolID: int32(school_id),
		Email:    userRegisterRequest.Email,
	}
	err = s.repository.CreateUser(&newUser)
	if err != nil {
		return response.UserRegisterDTO{}, errors.New("Kullanıcı oluşturlamadı lütfen tekrar deneyiniz")
	}

	response := response.UserRegisterDTO{
		Name:     newUser.Name,
		Surname:  newUser.Surname,
		Email:    newUser.Email,
		SchoolID: newUser.SchoolID,
	}
	return response, nil

}
