package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/kosnu/habook-backend/entity"
	"github.com/kosnu/habook-backend/graph/generated"
	"github.com/kosnu/habook-backend/graph/model"
)

func (r *mutationResolver) CreatePayment(ctx context.Context, input model.NewPayment) (*model.Payment, error) {
	panic(fmt.Errorf("not implemented"))
}

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

func (r *mutationResolver) CreateExpenseHistory(ctx context.Context, input model.NewExpenseHistory) (*model.ExpenseHistory, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreateIncomeHistory(ctx context.Context, input model.NewIncomeHistory) (*model.IncomeHistory, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Payment(ctx context.Context, id string) (*model.Payment, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Payments(ctx context.Context) ([]*model.Payment, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Product(ctx context.Context, id string) (*model.Product, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Products(ctx context.Context) ([]*model.Product, error) {
	panic(fmt.Errorf("not implemented"))
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
	users := []*model.User{}
	for _, record := range records {
		users = append(users, model.UserFromEntity(&record))
	}
	return users, nil
}

func (r *queryResolver) ExpenseHistory(ctx context.Context, id string) (*model.ExpenseHistory, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) ExpenseHistories(ctx context.Context) ([]*model.ExpenseHistory, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) IncomeHistory(ctx context.Context, id string) (*model.IncomeHistory, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) IncomeHistories(ctx context.Context) ([]*model.IncomeHistory, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
