package main

import (
	"whatsapp-app/internal/config/db"
)

func init() {
	db.Connect()
}

func main() {

	// newStudent := models.User{
	// 	Name:     "Samet",
	// 	Surname:  "Avci",
	// 	SchoolID: 210541076,
	// }
	// student := models.NewStudent(newStudent)

	// err := mgm.Coll(student).Create(student)
	// if err != nil {
	// 	fmt.Println(err)
	// }
}
