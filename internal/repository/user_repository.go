package repository

import (
	"context"
	"errors"
	"time"
	models "whatsapp-app/model"

	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	collectionName string = "basic_auth"

	mongoQueryTimeout = 10 * time.Second
)

type IUserRepository interface {
	FindAllUser() ([]*models.User, error)
	IsDuplicateSchoolID(id int32) bool
	CreateUser(newUser *models.User) error
	Login(school_id int32) (*models.User, error)
	FindUserWithEmail(email string) (*models.User, error)
	IsExistWithEmail(email string) bool

	UpdateUser(user *models.User) error
}

type UserRepository struct {
	db *mongo.Database
}

func NewUserRepository(db *mongo.Database) IUserRepository {
	return &UserRepository{db: db}
}

func (u *UserRepository) CreateUser(newUser *models.User) error {

	user := models.NewUser(newUser)

	err := mgm.Coll(user).Create(user)
	return err

}

func (u *UserRepository) FindAllUser() ([]*models.User, error) {

	var result []*models.User

	ctx, cancel := context.WithTimeout(context.Background(), mongoQueryTimeout)
	defer cancel()

	user := &models.User{}
	coll := mgm.Coll(user)

	cur, err := coll.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cur.Close(ctx)

	for cur.Next(ctx) {
		u := new(models.User)
		if err := cur.Decode(u); err != nil {
			return nil, err
		}

		result = append(result, u)
	}

	return result, cur.Err()
}

func (u *UserRepository) IsDuplicateSchoolID(id int32) bool {
	user := &models.User{}
	err := mgm.Coll(user).First(bson.M{"school_id": id}, user)
	if err != nil {
		return false
	}
	return true
}
func (u *UserRepository) IsExistWithEmail(email string) bool {
	user := &models.User{}
	err := mgm.Coll(user).First(bson.M{"email": email}, user)
	if err != nil {
		return false
	}
	return true
}

func (u *UserRepository) FindUserWithEmail(email string) (*models.User, error) {
	user := &models.User{}
	err := mgm.Coll(user).First(bson.M{"email": email}, user)
	if err != nil {
		return user, err
	}
	return user, err
}

func (u *UserRepository) Login(school_id int32) (*models.User, error) {

	user := &models.User{}
	err := mgm.Coll(user).First(bson.M{"school_id": school_id}, user)
	if err != nil {
		return user, errors.New("Kullanıcı bulunamadı.")
	}
	return user, nil
}

func (u *UserRepository) UpdateUser(user *models.User) error {
	err := mgm.Coll(user).Update(user)
	if err != nil {
		return err
	}
	return nil
}
