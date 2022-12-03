package response

type NewGroupDTO struct {
	DepartmentName string `json:"department_name"`
	Name           string `json:"group_name"`
	Link           string `json:"link"`
}

type GroupDTO struct {
	Name string `json:"group_name"`
	Link string `json:"link"`
}
type GetGroupsDTO struct {
	Groups []GroupDTO
}
