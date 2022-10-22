package request

type UserRegisterDTO struct {
	Name     string `json:"name" validate:"required"`
	Surname  string `json:"surname" validate:"required"`
	SchoolID int32  `json:"school_id" validate:"required"`
}
