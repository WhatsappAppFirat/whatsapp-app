package repository

import (
	models "whatsapp-app/model"

	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type IGroupRepository interface {
	Create(newGroup *models.Group) error
	FindByID(id uint16) (*models.Group, error)
	IsExist(groupLink string) bool
}

type GroupRepository struct {
	db *mongo.Database
}

func NewGroupRepository(db *mongo.Database) *GroupRepository {
	return &GroupRepository{db: db}
}

func (g *GroupRepository) Create(newGroup *models.Group) error {
	group := models.NewGroup(newGroup)
	err := mgm.Coll(group).Create(group)
	return err
}

func (g *GroupRepository) FindByID(id uint16) (*models.Group, error) {
	group := &models.Group{}
	err := mgm.Coll(group).First(bson.M{"id": id}, group)

	return group, err
}

func (g *GroupRepository) IsExist(link string) bool {
	group := &models.Group{}
	err := mgm.Coll(group).First(bson.M{"link": link}, group)
	if err != nil {
		return false
	}
	return true
}
