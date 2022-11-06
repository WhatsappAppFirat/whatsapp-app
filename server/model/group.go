package models

import "github.com/kamva/mgm/v3"

type Group struct {
	mgm.DefaultModel `bson:",inline"`
	Name             string `bson:"group_name" json:"group_name"`
	DepartmentCode   uint16 `json:"department_code" bson:"department_code"`
	Link             string `json:"group_link" bson:"group_link"`
}

func NewGroup(group *Group) *Group {
	return &Group{
		Name:           group.Name,
		DepartmentCode: group.DepartmentCode,
		Link:           group.Link,
	}
}
