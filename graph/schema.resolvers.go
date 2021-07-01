package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/kosnu/habook-backend/graph/generated"
	"github.com/kosnu/habook-backend/graph/model"
)

func (r *mutationResolver) CreatePayment(ctx context.Context, input model.NewPayment) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreateCategory(ctx context.Context, input model.NewCategory) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreateExpenseHistory(ctx context.Context, input model.NewExpenseHistory) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreateIncomeHistory(ctx context.Context, input model.NewIncomeHistory) (string, error) {
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

func (r *queryResolver) Category(ctx context.Context, id string) (*model.Category, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Categories(ctx context.Context) ([]*model.Category, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented"))
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
