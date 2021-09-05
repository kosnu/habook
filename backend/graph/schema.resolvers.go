package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/kosnu/habook-backend/graph/generated"
	"github.com/kosnu/habook-backend/graph/model"
)

func (r *mutationResolver) CreateExpenseHistory(ctx context.Context, input model.NewExpenseHistory) (*model.ExpenseHistory, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) ExpenseHistory(ctx context.Context, id string) (*model.ExpenseHistory, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) ExpenseHistories(ctx context.Context) ([]*model.ExpenseHistory, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
