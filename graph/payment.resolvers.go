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
	"gorm.io/gorm"
)

func (r *mutationResolver) CreatePayment(ctx context.Context, input model.NewPayment) (*model.Payment, error) {
	uuidV4 := uuid.New()
	paymentId := strings.Replace(uuidV4.String(), "-", "", -1)
	productId := strings.Replace(uuidV4.String(), "-", "", -1)
	now := time.Now()

	var record entity.Payment
	// TODO: paymentsに紐づくproductsを検索
	err := r.DB.Transaction(func(tx *gorm.DB) error {
		var product *entity.Product
		err := r.DB.Where(&entity.Product{Name: input.ProductName}).Attrs(&entity.Product{Id: productId, CreatedAt: now, UpdatedAt: now}).FirstOrCreate(&product).Error
		if err != nil {
			return err
		}

		record = entity.Payment{
			Id:              paymentId,
			TaxIncluded:     input.TaxIncluded,
			PaidOn:          input.PaidOn,
			NumberOfProduct: input.NumberOfProduct,
			Amount:          input.Amount,
			UserId:          input.UserID,
			CategoryId:      input.CategoryID,
			ProductId:       product.Id,
			CreatedAt:       now,
			UpdatedAt:       now,
		}

		if err := r.DB.Create(&record).Error; err != nil {
			return err
		}
		return nil
	})

	if err != nil {
		return nil, err
	}

	return model.PaymentFromEntity(&record), nil
}

func (r *paymentResolver) Product(ctx context.Context, obj *model.Payment) (*model.Product, error) {
	record, err := dataloader.For(ctx).ProductById.Load(obj.ProductID)
	if err != nil {
		return nil, err
	}
	return record, nil
}

func (r *paymentResolver) Category(ctx context.Context, obj *model.Payment) (*model.Category, error) {
	record, err := dataloader.For(ctx).CategoryById.Load(obj.CategoryID)
	if err != nil {
		return nil, err
	}
	return record, nil
}

func (r *paymentResolver) User(ctx context.Context, obj *model.Payment) (*model.User, error) {
	record, err := dataloader.For(ctx).UserById.Load(obj.UserID)
	if err != nil {
		return nil, err
	}
	return record, nil
}

func (r *queryResolver) Payment(ctx context.Context, id string) (*model.Payment, error) {
	var record entity.Payment
	if err := r.DB.Find(&record, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return model.PaymentFromEntity(&record), nil
}

func (r *queryResolver) Payments(ctx context.Context, input *model.SearchPayments) ([]*model.Payment, error) {
	var records []entity.Payment
	// TODO: Sortを引数に入れる
	query := r.DB.Debug()
	if input != nil {
		query = query.Where(&entity.Payment{UserId: input.UserID})
		if input.CategoryID != nil {
			query = query.Joins("left join categories on categories.id = payments.category_id").Where("categories.id = ?", input.CategoryID)
		}
		if input.ProductName != nil {
			queryArgs := "%" + *input.ProductName
			query = query.Joins("left join products on products.id = payments.product_id").Where("products.name like ?", queryArgs)
		}
	}

	if err := query.Order("payments.created_at asc").Find(&records).Error; err != nil {
		return []*model.Payment{}, err
	}

	var payments []*model.Payment
	for _, record := range records {
		payments = append(payments, model.PaymentFromEntity(&record))
	}

	return payments, nil
}

// Payment returns generated.PaymentResolver implementation.
func (r *Resolver) Payment() generated.PaymentResolver { return &paymentResolver{r} }

type paymentResolver struct{ *Resolver }
