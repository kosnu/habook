package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/kosnu/habook-backend/graph/generated"
	"github.com/kosnu/habook-backend/graph/model"
)

func (r *mutationResolver) CreatePayment(ctx context.Context, input model.NewPayment) (*model.Payment, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *paymentResolver) Product(ctx context.Context, obj *model.Payment) (*model.Product, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *paymentResolver) Category(ctx context.Context, obj *model.Payment) (*model.Category, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *paymentResolver) User(ctx context.Context, obj *model.Payment) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Payment(ctx context.Context, id string) (*model.Payment, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Payments(ctx context.Context, userID string, categoryID *string) ([]*model.Payment, error) {
	panic(fmt.Errorf("not implemented"))
}

// Payment returns generated.PaymentResolver implementation.
func (r *Resolver) Payment() generated.PaymentResolver { return &paymentResolver{r} }

type paymentResolver struct{ *Resolver }
