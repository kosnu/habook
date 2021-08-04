package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/kosnu/habook-backend/dataloader"
	"github.com/kosnu/habook-backend/entity"
	"github.com/kosnu/habook-backend/graph/generated"
	"github.com/kosnu/habook-backend/graph/model"
)

func (r *categoryResolver) User(ctx context.Context, obj *model.Category) (*model.User, error) {
	record, err := dataloader.For(ctx).UserById.Load(obj.UserID)
	if err != nil {
		return nil, err
	}
	return record, nil
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

func (r *queryResolver) Categories(ctx context.Context, input *model.SearchCategories, page model.PaginationInput) (*model.CategoryConnection, error) {
	var records []entity.Category
	// TODO: Sortを引数に入れる
	query, err := model.PageDB(r.DB.Debug(), "pk", "asc", page)
	if err != nil {
		return &model.CategoryConnection{}, err
	}
	if input != nil {
		query = query.Where(&entity.Category{UserId: input.UserID})
		if input.Name != nil {
			query = query.Where(&entity.Category{Name: *input.Name})
		}
		if input.Enable != nil {
			query = query.Where("enable = ?", *input.Enable)
		}
	}

	if err := query.Find(&records).Error; err != nil {
		return &model.CategoryConnection{}, err
	}

	var categories []*model.Category
	for _, record := range records {
		categories = append(categories, model.CategoryFromEntity(&record))
	}

	return model.CategoryToConnection(categories, page), nil
}

// Category returns generated.CategoryResolver implementation.
func (r *Resolver) Category() generated.CategoryResolver { return &categoryResolver{r} }

type categoryResolver struct{ *Resolver }
