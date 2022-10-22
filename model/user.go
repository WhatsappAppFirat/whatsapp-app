package models

import (
	"github.com/kamva/mgm/v3"
)

type User struct {
	mgm.DefaultModel `bson:",inline"`
	Name             string `json:"name" bson:"name"`
	Surname          string `json:"surname" bson:"surname"`
	SchoolID         int32  `json:"school_id" bson:"school_id"`
}

func NewUser(user User ) *User {
	return &User{
		Name:     user.Name,
		Surname:  user.Surname,
		SchoolID: user.SchoolID,
	}
}
