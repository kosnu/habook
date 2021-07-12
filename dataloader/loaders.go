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
	UserById UserLoader
}

func Middleware(db *gorm.DB, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := context.WithValue(r.Context(), loadersKey, &Loaders{
			UserById: UserLoader{
				maxBatch: 100,
				wait:     1 * time.Millisecond,
				fetch: func(ids []string) ([]*model.User, []error) {
					var records []entity.User
					if err := db.Find(&records, ids).Error; err != nil {
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
		})
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

func For(ctx context.Context) *Loaders {
	return ctx.Value(loadersKey).(*Loaders)
}
