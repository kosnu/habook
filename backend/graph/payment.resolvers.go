package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"strings"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/google/uuid"
	"github.com/kosnu/habook-backend/dataloader"
	"github.com/kosnu/habook-backend/entity"
	"github.com/kosnu/habook-backend/graph/generated"
	"github.com/kosnu/habook-backend/graph/model"
	"github.com/kosnu/habook-backend/lib"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

// CreatePayment is the resolver for the createPayment field.
func (r *mutationResolver) CreatePayment(ctx context.Context, input model.NewPayment) (*model.Payment, error) {
	uuidV4 := uuid.New()
	paymentId := strings.Replace(uuidV4.String(), "-", "", -1)
	productId := strings.Replace(uuidV4.String(), "-", "", -1)
	paidOn, err := lib.StringToTime(input.PaidOn)
	if err != nil {
		return &model.Payment{}, err
	}
	now := time.Now()

	if len(input.ProductName) <= 0 {
		graphql.AddError(ctx, gqlerror.Errorf(lib.ProductNameValidationMessage))
		return &model.Payment{}, nil
	}

	if len(input.CategoryID) <= 0 {
		graphql.AddError(ctx, gqlerror.Errorf(lib.CategoryValidationMessage))
		return &model.Payment{}, nil
	}

	var category *entity.Category
	err = r.DB.Debug().First(&category, "id = ? AND user_id = ?", input.CategoryID, input.UserID).Error
	if category == nil || err != nil {
		graphql.AddError(ctx, gqlerror.Errorf(lib.CategoryValidationMessage))
		return &model.Payment{}, nil
	}

	var record entity.Payment
	// TODO: paymentsに紐づくproductsを検索
	err = r.DB.Transaction(func(tx *gorm.DB) error {
		var product *entity.Product
		err := r.DB.Where(&entity.Product{Name: input.ProductName}).Attrs(&entity.Product{Id: productId, CreatedAt: now, UpdatedAt: now}).FirstOrCreate(&product).Error
		if err != nil {
			return err
		}

		record = entity.Payment{
			Id:              paymentId,
			TaxIncluded:     input.TaxIncluded,
			PaidOn:          paidOn,
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
		return &model.Payment{}, err
	}

	return model.PaymentFromEntity(&record), nil
}

// UpdatePayment is the resolver for the updatePayment field.
func (r *mutationResolver) UpdatePayment(ctx context.Context, input model.UpdatePayment) (*model.Payment, error) {
	var record entity.Payment
	paymentRecord := r.DB.Find(&record, "id = ? AND user_id = ?", input.ID, input.UserID)
	paidOn, err := lib.StringToTime(input.PaidOn)
	if err != nil {
		return &model.Payment{}, err
	}

	if len(input.CategoryID) <= 0 {
		graphql.AddError(ctx, gqlerror.Errorf(lib.CategoryValidationMessage))
		return &model.Payment{}, nil
	}

	var category *entity.Category
	err = r.DB.Find(&category, "id = ? AND user_id = ?", input.CategoryID, input.UserID).Error
	if category == nil || err != nil {
		graphql.AddError(ctx, gqlerror.Errorf(lib.CategoryValidationMessage))
		return &model.Payment{}, nil
	}

	err = paymentRecord.Select("TaxIncluded", "PaidOn", "NumberOfProduct", "Amount", "CategoryID").Updates(entity.Payment{
		TaxIncluded:     input.TaxIncluded,
		PaidOn:          paidOn,
		NumberOfProduct: input.NumberOfProduct,
		Amount:          input.Amount,
		CategoryId:      input.CategoryID,
	}).Error

	if err != nil {
		return &model.Payment{}, err
	}

	return model.PaymentFromEntity(&record), nil
}

// DeletePayment is the resolver for the deletePayment field.
func (r *mutationResolver) DeletePayment(ctx context.Context, input model.DeletePayment) (bool, error) {
	var record entity.Payment
	err := r.DB.Find(&record, "id = ? AND user_id = ?", input.ID, input.UserID).Delete(&record).Error
	if err != nil {
		return false, err
	}

	return true, nil
}

// Product is the resolver for the product field.
func (r *paymentResolver) Product(ctx context.Context, obj *model.Payment) (*model.Product, error) {
	record, err := dataloader.For(ctx).ProductById.Load(obj.ProductID)
	if err != nil {
		return &model.Product{}, err
	}
	return record, nil
}

// Category is the resolver for the category field.
func (r *paymentResolver) Category(ctx context.Context, obj *model.Payment) (*model.Category, error) {
	record, err := dataloader.For(ctx).CategoryById.Load(obj.CategoryID)
	if err != nil {
		return nil, err
	}
	return record, nil
}

// User is the resolver for the user field.
func (r *paymentResolver) User(ctx context.Context, obj *model.Payment) (*model.User, error) {
	record, err := dataloader.For(ctx).UserById.Load(obj.UserID)
	if err != nil {
		return &model.User{}, err
	}
	return record, nil
}

// Payment is the resolver for the payment field.
func (r *queryResolver) Payment(ctx context.Context, id string) (*model.Payment, error) {
	var record entity.Payment
	if err := r.DB.Find(&record, "id = ?", id).Error; err != nil {
		return &model.Payment{}, err
	}

	return model.PaymentFromEntity(&record), nil
}

// Payments is the resolver for the payments field.
func (r *queryResolver) Payments(ctx context.Context, input *model.SearchPayments, page model.PaginationInput) (*model.PaymentConnection, error) {
	var records []entity.Payment
	// TODO: Sortを引数に入れる
	query, err := model.PageDB(r.DB.Debug(), "asc", page, "payments")
	if err != nil {
		return &model.PaymentConnection{}, err
	}
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
		return &model.PaymentConnection{}, err
	}

	var payments []*model.Payment
	for _, record := range records {
		payments = append(payments, model.PaymentFromEntity(&record))
	}

	return model.PaymentToConnection(payments, page), nil
}

// Payment returns generated.PaymentResolver implementation.
func (r *Resolver) Payment() generated.PaymentResolver { return &paymentResolver{r} }

type paymentResolver struct{ *Resolver }
