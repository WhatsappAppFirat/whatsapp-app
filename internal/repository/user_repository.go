package repository

import (
	"context"
	models "whatsapp-app/model"
)

type IUserRepository interface {
	Register(ctx context.Context, user *models.User) error
	IsDuplicateSchoolID(ctx context.Context, email string) bool
}
