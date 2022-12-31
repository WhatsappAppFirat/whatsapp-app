package request

type NewGroupDTO struct {
	Name           string `json:"name" validate:"required"`
	DepartmentCode uint16 `json:"department_code" validate:"required"`
	Link           string `json:"link" validate:"required"`
}
type VerifyGroup struct {
	ID       string `json:"id" validate:"required"`
	IsVerify uint   `json:"is_verify" validate:"required"`
}

type DeleteGroup struct {
	ID string `json:"id" validate:"required" param:"id" query:"id"`
}
