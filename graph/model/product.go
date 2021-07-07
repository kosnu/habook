package model

import "github.com/kosnu/habook-backend/entity"

type Product struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

func ProductFromEntity(entity *entity.Product) *Product {
	return &Product{
		ID:        entity.Id,
		Name:      entity.Name,
		CreatedAt: entity.CreatedAt.String(),
		UpdatedAt: entity.UpdatedAt.String(),
	}
}
