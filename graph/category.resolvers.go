package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/kosnu/habook-backend/entity"
	"github.com/kosnu/habook-backend/graph/generated"
	"github.com/kosnu/habook-backend/graph/model"
)

func (r *categoryResolver) User(ctx context.Context, obj *model.Category) (*model.User, error) {
	// TODO: N+1問題の解決
	var record entity.User
	if err := r.DB.Find(&record, "id = ?", obj.UserId).Error; err != nil {
		return nil, err
	}

	return model.UserFromEntity(&record), nil
}

func (r *mutationResolver) CreateCategory(ctx context.Context, input model.NewCategory) (*model.Category, error) {
	uuidV4 := uuid.New()
	id := strings.Replace(uuidV4.String(), "-", "", -1)
	now := time.Now()

	record := entity.Category{
		Id:        id,
		Name:      input.Name,
		Enable:    true,
		UserId:    input.UserID,
		CreatedAt: now,
		UpdatedAt: now,
	}

	if err := r.DB.Create(&record).Error; err != nil {
		return nil, err
	}

	return model.CategoryFromEntity(&record), nil
}

func (r *queryResolver) Category(ctx context.Context, id string) (*model.Category, error) {
	var record entity.Category
	// TODO: 検索項目を増やす
	if err := r.DB.Find(&record, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return model.CategoryFromEntity(&record), nil
}

func (r *queryResolver) Categories(ctx context.Context) ([]*model.Category, error) {
	var records []entity.Category
	// TODO: Sortを引数に入れる
	// TODO: 検索項目を増やす
	if err := r.DB.Order("created_at asc").Find(&records).Error; err != nil {
		return []*model.Category{}, err
	}

	var categories []*model.Category
	for _, record := range records {
		categories = append(categories, model.CategoryFromEntity(&record))
	}

	return categories, nil
}

// Category returns generated.CategoryResolver implementation.
func (r *Resolver) Category() generated.CategoryResolver { return &categoryResolver{r} }

type categoryResolver struct{ *Resolver }
