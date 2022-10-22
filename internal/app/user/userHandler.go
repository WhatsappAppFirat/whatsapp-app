package user

import (
	"net/http"
	"whatsapp-app/dto/request"
	userService "whatsapp-app/internal/service/user"
	"whatsapp-app/internal/utils/response"
	"whatsapp-app/internal/utils/validate"

	"github.com/labstack/echo/v4"
)

type IUserHandler interface {
	Register(ctx echo.Context) error
}

type UserHandler struct {
	service userService.IUserService
}

func NewUserHandler(service userService.IUserService) IUserHandler {
	return &UserHandler{
		service: service,
	}
}

func (h *UserHandler) Register(c echo.Context) error {
	var request request.UserRegisterDTO
	if validate.Validator(&c, &request) != nil {
		return nil
	}
	ctx := c.Request().Context()

	user, err := h.service.Register(ctx, request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, response.Response(http.StatusBadRequest, err.Error()))

	}
	return c.JSON(http.StatusOK, response.Response(http.StatusOK, user))

}
