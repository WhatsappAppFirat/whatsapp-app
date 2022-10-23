package response

type UserRegisterDTO struct {
	ID       uint   `gorm:"primarykey"`
	Name     string `json:"name"`
	Surname  string `json:"surname"`
	SchoolID int32  `json:"school_id"`
	Email    string `json:"email"`
}
