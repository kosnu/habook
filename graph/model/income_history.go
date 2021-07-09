package model

import "github.com/kosnu/habook-backend/entity"

type IncomeHistory struct {
	ID        string `json:"id"`
	Income    int    `json:"income"`
	UserID    string `json:"user"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

type NewIncomeHistory struct {
	Income int    `json:"income"`
	UserID string `json:"userId"`
}

func IncomeHistoryFromEntity(entity *entity.IncomeHistory) *IncomeHistory {
	return &IncomeHistory{
		ID:        entity.Id,
		Income:    entity.Income,
		UserID:    entity.UserId,
		CreatedAt: entity.CreatedAt.String(),
		UpdatedAt: entity.UpdatedAt.String(),
	}
}
