package response

type UserRegisterDTO struct {
	ID       uint   `gorm:"primarykey"`
	Name     string `json:"name"`
	Surname  string `json:"surname"`
	SchoolID string `json:"school_id"`
}
