package group

import (
	"net/http"
	"whatsapp-app/dto/request"
	groupService "whatsapp-app/internal/service/group"
	"whatsapp-app/internal/utils"
	"whatsapp-app/internal/utils/response"
	"whatsapp-app/internal/utils/validate"

	"github.com/labstack/echo/v4"
)

type IGroupHandler interface {
	NewFaculty(c echo.Context) error
	NewDepartment(c echo.Context) error
	NewGroup(c echo.Context) error
}

type GroupHandler struct {
	service groupService.IGroupService
	utils   utils.IUtils
}

func NewGroupHandler(service groupService.IGroupService, utils utils.IUtils) *GroupHandler {
	return &GroupHandler{service: service, utils: utils}
}

func (h *GroupHandler) NewFaculty(c echo.Context) error {
	var request request.NewFacultyDTO
	if validate.Validator(&c, &request) != nil {
		return nil
	}
	ctx := c.Request().Context()
	faculty, err := h.service.NewFaculty(ctx, request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, response.Response(http.StatusBadRequest, err.Error()))
	}
	return c.JSON(http.StatusOK, response.Response(http.StatusOK, faculty))
}

func (h *GroupHandler) NewDepartment(c echo.Context) error {
	var request request.NewDepartmentDTO
	if validate.Validator(&c, &request) != nil {
		return nil
	}
	ctx := c.Request().Context()
	department, err := h.service.NewDepartment(ctx, request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, response.Response(http.StatusBadRequest, err.Error()))
	}
	return c.JSON(http.StatusOK, response.Response(http.StatusOK, department))
}


func (h *GroupHandler) NewGroup(c echo.Context) error {
	var request request.NewGroupDTO
	if validate.Validator(&c, &request) != nil {
		return nil
	}
	ctx := c.Request().Context()
	group, err := h.service.NewGroup(ctx, request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, response.Response(http.StatusBadRequest, err.Error()))
	}
	return c.JSON(http.StatusOK, response.Response(http.StatusOK, group))
}
