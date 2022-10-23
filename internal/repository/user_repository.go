package repository

import (
	"context"
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
	//Remove(username string) error
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

	// ctx, cancel := context.WithTimeout(context.Background(), mongoQueryTimeout)
	// defer cancel()

	user := &models.User{}

	err := mgm.Coll(user).First(bson.M{"school_id": id}, user)
	if err != nil {
		return false
	}
	return true
}
