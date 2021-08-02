package model

import "github.com/kosnu/habook-backend/entity"

type Payment struct {
	Pk              int    `json:"pk"`
	ID              string `json:"id"`
	TaxIncluded     bool   `json:"taxIncluded"`
	PaidOn          string `json:"paidOn"`
	NumberOfProduct int    `json:"numberOfProduct"`
	Amount          int    `json:"amount"`
	ProductID       string `json:"product"`
	CategoryID      string `json:"category"`
	UserID          string `json:"user"`
	CreatedAt       string `json:"createdAt"`
	UpdatedAt       string `json:"updatedAt"`
}

type NewPayment struct {
	TaxIncluded     bool   `json:"taxIncluded"`
	PaidOn          string `json:"paidOn"`
	NumberOfProduct int    `json:"numberOfProduct"`
	Amount          int    `json:"amount"`
	ProductName     string `json:"productName"`
	CategoryID      string `json:"categoryId"`
	UserID          string `json:"userId"`
}

type SearchPayments struct {
	UserID      string  `json:"userId"`
	ProductName *string `json:"productName"`
	CategoryID  *string `json:"categoryId"`
}

func PaymentFromEntity(entity *entity.Payment) *Payment {
	return &Payment{
		ID:              entity.Id,
		TaxIncluded:     entity.TaxIncluded,
		PaidOn:          entity.PaidOn,
		NumberOfProduct: entity.NumberOfProduct,
		Amount:          entity.Amount,
		UserID:          entity.UserId,
		CategoryID:      entity.CategoryId,
		ProductID:       entity.ProductId,
		CreatedAt:       entity.CreatedAt.String(),
		UpdatedAt:       entity.UpdatedAt.String(),
	}
}
