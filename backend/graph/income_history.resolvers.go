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
)

func (r *incomeHistoryResolver) User(ctx context.Context, obj *model.IncomeHistory) (*model.User, error) {
	record, err := dataloader.For(ctx).UserById.Load(obj.UserID)
	if err != nil {
		return nil, err
	}
	return record, nil
}

func (r *mutationResolver) CreateIncomeHistory(ctx context.Context, input model.NewIncomeHistory) (*model.IncomeHistory, error) {
	uuidV4 := uuid.New()
	id := strings.Replace(uuidV4.String(), "-", "", -1)
	now := time.Now()

	record := entity.IncomeHistory{
		Id:        id,
		Income:    input.Income,
		UserId:    input.UserID,
		CreatedAt: now,
		UpdatedAt: now,
	}

	if err := r.DB.Create(&record).Error; err != nil {
		return nil, err
	}

	return model.IncomeHistoryFromEntity(&record), nil
}

func (r *queryResolver) IncomeHistory(ctx context.Context, id string) (*model.IncomeHistory, error) {
	var record entity.IncomeHistory
	if err := r.DB.Find(&record, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return model.IncomeHistoryFromEntity(&record), nil
}

func (r *queryResolver) IncomeHistories(ctx context.Context, input *model.SearchIncomeHistory) ([]*model.IncomeHistory, error) {
	var records []entity.IncomeHistory
	// TODO: Sortを引数に入れる
	query := r.DB.Debug().Order("created_at asc")
	if input != nil {
		query = query.Where(&entity.IncomeHistory{UserId: input.UserID})

		// input.BeginningOfPeriod以降の収入履歴
		if input.BeginningOfPeriod != nil && input.EndOfPeriod == nil {
			query = query.Where("created_at > ?", input.BeginningOfPeriod)
		}
		// input.EndOfPeriodまでの収入履歴
		if input.BeginningOfPeriod == nil && input.EndOfPeriod != nil {
			query = query.Where("created_at < ?", input.EndOfPeriod)
		}
		// input.BeginningOfPeriodからinput.EndOfPeriodまでの収入履歴
		if input.BeginningOfPeriod != nil && input.EndOfPeriod != nil {
			query = query.Where("created_at BETWEEN ? AND ?", input.BeginningOfPeriod, input.EndOfPeriod)
		}
	}

	if err := query.Find(&records).Error; err != nil {
		return []*model.IncomeHistory{}, err
	}

	var incomeHistories []*model.IncomeHistory
	for _, record := range records {
		incomeHistories = append(incomeHistories, model.IncomeHistoryFromEntity(&record))
	}

	return incomeHistories, nil
}

// IncomeHistory returns generated.IncomeHistoryResolver implementation.
func (r *Resolver) IncomeHistory() generated.IncomeHistoryResolver { return &incomeHistoryResolver{r} }

type incomeHistoryResolver struct{ *Resolver }
