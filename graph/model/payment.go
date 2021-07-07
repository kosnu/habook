package model

import "github.com/kosnu/habook-backend/entity"

type Payment struct {
	Id              string `json:"id"`
	TaxIncluded     bool   `json:"taxIncluded"`
	PaidOn          string `json:"paidOn"`
	NumberOfProduct int    `json:"numberOfProduct"`
	Amount          int    `json:"amount"`
	ProductId       string `json:"product"`
	UserId          string `json:"user"`
	CategoryId      string `json:"category"`
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
		Id:              entity.Id,
		TaxIncluded:     entity.TaxIncluded,
		PaidOn:          entity.PaidOn,
		NumberOfProduct: entity.NumberOfProduct,
		Amount:          entity.Amount,
		UserId:          entity.UserId,
		CategoryId:      entity.CategoryId,
		ProductId:       entity.ProductId,
		CreatedAt:       entity.CreatedAt.String(),
		UpdatedAt:       entity.UpdatedAt.String(),
	}
}
