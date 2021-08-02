package model

import "github.com/kosnu/habook-backend/entity"

type Product struct {
	Pk        int    `json:"pk"`
	ID        string `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

type SearchProduct struct {
	UserID      string  `json:"userId"`
	ProductName *string `json:"productName"`
}

func ProductFromEntity(entity *entity.Product) *Product {
	return &Product{
		ID:        entity.Id,
		Name:      entity.Name,
		CreatedAt: entity.CreatedAt.String(),
		UpdatedAt: entity.UpdatedAt.String(),
	}
}
