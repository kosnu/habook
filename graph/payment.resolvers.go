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
	"gorm.io/gorm"
)

func (r *mutationResolver) CreatePayment(ctx context.Context, input model.NewPayment) (*model.Payment, error) {
	uuidV4 := uuid.New()
	paymentId := strings.Replace(uuidV4.String(), "-", "", -1)
	now := time.Now()

	var record entity.Payment
	// TODO: paymentsに紐づくproductsを検索
	err := r.DB.Transaction(func(tx *gorm.DB) error {
		var product *entity.Product
		// TODO: record not foundのログが出るのでなんとかする
		err := r.DB.Where(&model.Product{Name: input.ProductName}).First(&product).Error
		if err != nil {
			productId := strings.Replace(uuidV4.String(), "-", "", -1)
			product = &entity.Product{
				Id:        productId,
				Name:      input.ProductName,
				CreatedAt: now,
				UpdatedAt: now,
			}
			if err = r.DB.Create(&product).Error; err != nil {
				return err
			}
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
	// TODO: N+1問題の解決
	var record entity.Product
	if err := r.DB.Find(&record, "id = ?", obj.ProductId).Error; err != nil {
		return nil, err
	}

	return model.ProductFromEntity(&record), nil
}

func (r *paymentResolver) Category(ctx context.Context, obj *model.Payment) (*model.Category, error) {
	// TODO: N+1問題の解決
	var record entity.Category
	if err := r.DB.Find(&record, "id = ?", obj.CategoryId).Error; err != nil {
		return nil, err
	}

	return model.CategoryFromEntity(&record), nil
}

func (r *paymentResolver) User(ctx context.Context, obj *model.Payment) (*model.User, error) {
	// TODO: N+1問題の解決
	var record entity.User
	if err := r.DB.Find(&record, "id = ?", obj.UserId).Error; err != nil {
		return nil, err
	}

	return model.UserFromEntity(&record), nil
}

func (r *queryResolver) Payment(ctx context.Context, id string) (*model.Payment, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Payments(ctx context.Context, input *model.SearchPayments) ([]*model.Payment, error) {
	var records []entity.Payment
	// TODO: Sortを引数に入れる
	query := r.DB.Debug().Order("created_at asc")
	if input != nil {
		query = query.Where(&model.Payment{UserId: input.UserID})
		if input.CategoryID != nil {
			query = query.Joins("left join categories on categories.id = payments.category_id").Where("categories.id = ?", input.CategoryID)
		}
		if input.ProductName != nil {
			query = query.Joins("left join products on products.id = payments.product_id").Where("products.name = ?", input.ProductName)
		}
	}

	if err := query.Find(&records).Error; err != nil {
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
