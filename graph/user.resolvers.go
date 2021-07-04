package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/kosnu/habook-backend/entity"
	"github.com/kosnu/habook-backend/graph/model"
)

func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	uuidV4 := uuid.New()
	id := strings.Replace(uuidV4.String(), "-", "", -1)
	now := time.Now()

	record := entity.User{
		Id:        id,
		Enable:    true,
		Name:      input.Name,
		CreatedAt: now,
		UpdatedAt: now,
	}
	if err := r.DB.Create(&record).Error; err != nil {
		return nil, err
	}

	res := model.UserFromEntity(&record)

	return res, nil
}

func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	var record entity.User
	if err := r.DB.Debug().Find(&record, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return model.UserFromEntity(&record), nil
}

func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	var records []entity.User
	if err := r.DB.Find(&records).Error; err != nil {
		return nil, err
	}
	var users []*model.User
	for _, record := range records {
		users = append(users, model.UserFromEntity(&record))
	}
	return users, nil
}
