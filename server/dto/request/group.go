package request

type NewGroupDTO struct {
	Name           string `json:"name" validate:"required"`
	DepartmentCode uint16 `json:"department_code" validate:"required"`
	Link           string `json:"link" validate:"required"`
}
type VerifyGroup struct {
	ID       string `json:"id" validate:"omitempty" param:"id" query:"id"`
	IsVerify uint   `json:"is_verify" validate:"required" param:"is_verify" query:"is_verify"`
}

type DeleteGroup struct {
	ID string `json:"id" validate:"omitempty" param:"id" query:"id"`
}
