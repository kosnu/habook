package dataloader

import (
	"context"
	"net/http"
	"time"

	"github.com/kosnu/habook-backend/entity"
	"github.com/kosnu/habook-backend/graph/model"
	"gorm.io/gorm"
)

const loadersKey = "dataloaders"

type Loaders struct {
	UserById     UserLoader
	CategoryById CategoryLoader
	ProductById  ProductLoader
	PaymentById  PaymentLoader
}

func Middleware(db *gorm.DB, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// TODO: CORSガバガバなので修正する
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		ctx := context.WithValue(r.Context(), loadersKey, &Loaders{
			UserById: UserLoader{
				maxBatch: 100,
				wait:     1 * time.Millisecond,
				fetch: func(ids []string) ([]*model.User, []error) {
					var records []entity.User
					if err := db.Find(&records, "id in ?", ids).Error; err != nil {
						return nil, []error{err}
					}

					userByID := map[string]*model.User{}
					for _, record := range records {
						user := model.UserFromEntity(&record)
						userByID[user.ID] = user
					}

					users := make([]*model.User, len(ids))
					for i, key := range ids {
						users[i] = userByID[key]
					}

					return users, nil
				},
			},
			CategoryById: CategoryLoader{
				maxBatch: 100,
				wait:     1 * time.Millisecond,
				fetch: func(ids []string) ([]*model.Category, []error) {
					var records []entity.Category
					if err := db.Find(&records, "id in ?", ids).Error; err != nil {
						return nil, []error{err}
					}

					categoryByID := map[string]*model.Category{}
					for _, record := range records {
						category := model.CategoryFromEntity(&record)
						categoryByID[category.ID] = category
					}

					categories := make([]*model.Category, len(ids))
					for i, key := range ids {
						categories[i] = categoryByID[key]
					}

					return categories, nil
				},
			},
			ProductById: ProductLoader{
				maxBatch: 100,
				wait:     1 * time.Millisecond,
				fetch: func(ids []string) ([]*model.Product, []error) {
					var records []entity.Product
					if err := db.Find(&records, "id in ?", ids).Error; err != nil {
						return nil, []error{err}
					}

					productByID := map[string]*model.Product{}
					for _, record := range records {
						product := model.ProductFromEntity(&record)
						productByID[product.ID] = product
					}

					products := make([]*model.Product, len(ids))
					for i, key := range ids {
						products[i] = productByID[key]
					}

					return products, nil
				},
			},
			PaymentById: PaymentLoader{
				maxBatch: 100,
				wait:     1 * time.Millisecond,
				fetch: func(ids []string) ([]*model.Payment, []error) {
					var records []entity.Payment
					if err := db.Find(&records, "id in ?", ids).Error; err != nil {
						return nil, []error{err}
					}

					paymentByID := map[string]*model.Payment{}
					for _, record := range records {
						payment := model.PaymentFromEntity(&record)
						paymentByID[payment.ID] = payment
					}

					payments := make([]*model.Payment, len(ids))
					for i, key := range ids {
						payments[i] = paymentByID[key]
					}

					return payments, nil
				},
			},
		})
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

func For(ctx context.Context) *Loaders {
	return ctx.Value(loadersKey).(*Loaders)
}
