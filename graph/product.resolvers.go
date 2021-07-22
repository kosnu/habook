package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/kosnu/habook-backend/entity"
	"github.com/kosnu/habook-backend/graph/model"
)

func (r *queryResolver) Product(ctx context.Context, id string) (*model.Product, error) {
	var record entity.Product
	if err := r.DB.Find(&record, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return model.ProductFromEntity(&record), nil
}

func (r *queryResolver) Products(ctx context.Context, input *model.SearchProduct) ([]*model.Product, error) {
	var records []entity.Product
	// TODO: Sortを引数に入れる
	query := r.DB.Debug().Joins("left join payments on payments.product_id = products.id")
	if input != nil {
		query = query.Where("payments.user_id = ?", input.UserID)
		if input.ProductName != nil {
			queryArgs := "%" + *input.ProductName + "%"
			query = query.Where("products.name like ?", queryArgs)
		}
	}

	err := query.Order("products.name asc").Group("products.id").Find(&records).Error
	if err != nil {
		return []*model.Product{}, err
	}

	var products []*model.Product
	for _, record := range records {
		products = append(products, model.ProductFromEntity(&record))
	}

	return products, nil
}
