package group

import (
	"context"
	"errors"
	"strings"
	"whatsapp-app/dto/request"
	"whatsapp-app/dto/response"
	"whatsapp-app/internal/service"
	models "whatsapp-app/model"
)

type IGroupService interface {
	NewFaculty(ctx context.Context, request request.NewFacultyDTO) (response.NewFacultyDTO, error)
	NewDepartment(ctx context.Context, request request.NewDepartmentDTO) (response.NewDepartmentDTO, error)
	NewGroup(ctx context.Context, request request.NewGroupDTO) (response.NewGroupDTO, error)
	GetGroups(ctx context.Context, schoolID string) (response.GetGroupsDTO, error)
}

type GroupService struct {
	repository Repository
	service    service.Service
}

func NewGroupService(repository Repository, service service.Service) IGroupService {
	return &GroupService{repository: repository, service: service}
}

func (s *GroupService) NewFaculty(ctx context.Context, request request.NewFacultyDTO) (response.NewFacultyDTO, error) {

	isExist := s.repository.Faculty.IsExist(request.Code)
	if isExist {
		return response.NewFacultyDTO{}, errors.New("Eklemek istediğiniz fakülte zaten bulunmaktadır.")
	}

	faculty := models.Faculty{
		Name: request.Name,
		Code: request.Code,
	}
	err := s.repository.Faculty.Create(&faculty)
	if err != nil {
		return response.NewFacultyDTO{}, errors.New("Fakülte eklenemedi, lütfen tekrar deneyiniz.")
	}

	response := response.NewFacultyDTO{
		Name: request.Name,
		Code: request.Code,
	}
	return response, nil

}

func (s *GroupService) NewDepartment(ctx context.Context, request request.NewDepartmentDTO) (response.NewDepartmentDTO, error) {
	faculty, err := s.repository.Faculty.FindByID(request.FacultyCode)
	if err != nil {
		return response.NewDepartmentDTO{}, errors.New("Bölümü eklemek istediğiniz fakülte mevcut değildir.")
	}

	isExist := s.repository.Department.IsExist(request.Code)
	if isExist {
		return response.NewDepartmentDTO{}, errors.New("Eklemek istediğiniz bölüm zaten bulunmaktadır.")
	}

	department := &models.Department{
		FacultyID: request.FacultyCode,
		Name:      request.Name,
		Code:      request.Code,
	}
	err = s.repository.Department.Create(department)
	if err != nil {
		return response.NewDepartmentDTO{}, errors.New("Bölüm eklenemedi, lütfen tekrar deneyiniz.")
	}

	response := response.NewDepartmentDTO{
		FacultyName: faculty.Name,
		Name:        department.Name,
		Code:        department.Code,
	}
	return response, nil

}

//TODO: Mongo'da foreign key'e bakılacak.
func (s *GroupService) NewGroup(ctx context.Context, request request.NewGroupDTO) (response.NewGroupDTO, error) {
	department, err := s.repository.Department.FindByID(request.DepartmentCode)
	if err != nil {
		return response.NewGroupDTO{}, errors.New("Link eklemek istediğiniz bölüm bulunamadı.")

	}

	isExist := s.repository.Group.IsExist(request.Link)
	if isExist {
		return response.NewGroupDTO{}, errors.New("Link zaten var.")
	}

	group := &models.Group{
		Name:           request.Name,
		DepartmentCode: request.DepartmentCode,
		Link:           request.Link,
	}

	err = s.repository.Group.Create(group)
	if err != nil {
		return response.NewGroupDTO{}, errors.New("Grup eklenemedi, lütfen tekrar deneyiniz.")
	}
	response := response.NewGroupDTO{
		DepartmentName: department.Name,
		Name:           group.Name,
		Link:           group.Link,
	}
	return response, nil

}
func (s *GroupService) GetGroups(ctx context.Context, schoolID string) (response.GetGroupsDTO, error) {
	str := strings.Split(schoolID, "")
	strDep := str[3:6]

	var departmentID string
	for _, val := range strDep {
		departmentID += val
	}

	groups, err := s.repository.Group.FindByDepartmentID(ctx, departmentID)
	if err != nil {
		return response.GetGroupsDTO{}, errors.New("Gruplar getirilemedi")
	}
	var getGroupsDTO response.GetGroupsDTO

	for _, val := range groups {
		group := response.GroupDTO{
			Name: val.Name,
			Link: val.Link,
		}

		getGroupsDTO.Groups = append(getGroupsDTO.Groups, group)
	}

	return getGroupsDTO, nil
}
