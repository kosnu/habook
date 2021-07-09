package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/kosnu/habook-backend/graph/generated"
	"github.com/kosnu/habook-backend/graph/model"
)

func (r *incomeHistoryResolver) User(ctx context.Context, obj *model.IncomeHistory) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreateIncomeHistory(ctx context.Context, input model.NewIncomeHistory) (*model.IncomeHistory, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) IncomeHistory(ctx context.Context, id string) (*model.IncomeHistory, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) IncomeHistories(ctx context.Context) ([]*model.IncomeHistory, error) {
	panic(fmt.Errorf("not implemented"))
}

// IncomeHistory returns generated.IncomeHistoryResolver implementation.
func (r *Resolver) IncomeHistory() generated.IncomeHistoryResolver { return &incomeHistoryResolver{r} }

type incomeHistoryResolver struct{ *Resolver }
