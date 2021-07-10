package model

import "github.com/kosnu/habook-backend/entity"

type Category struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Enable    bool   `json:"enable"`
	UserID    string `json:"user"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

type NewCategory struct {
	Name   string `json:"name"`
	UserID string `json:"userId"`
}

type SearchCategories struct {
	Name   *string `json:"name"`
	Enable *bool   `json:"enable"`
	UserID string  `json:"userId"`
}

func CategoryFromEntity(entity *entity.Category) *Category {
	return &Category{
		ID:        entity.Id,
		Name:      entity.Name,
		Enable:    entity.Enable,
		UserID:    entity.UserId,
		CreatedAt: entity.CreatedAt.String(),
		UpdatedAt: entity.UpdatedAt.String(),
	}
}
