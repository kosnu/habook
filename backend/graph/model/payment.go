package model

import (
	"strconv"

	"github.com/kosnu/habook-backend/entity"
	"github.com/kosnu/habook-backend/lib"
)

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

func (Payment) IsNode() {}

type PaymentConnection struct {
	Edges    []*PaymentEdge `json:"edges"`
	PageInfo *PageInfo      `json:"pageInfo"`
}

func (PaymentConnection) IsConnection() {}

type PaymentEdge struct {
	Cursor string   `json:"cursor"`
	Node   *Payment `json:"node"`
}

func (PaymentEdge) IsEdge() {}

type NewPayment struct {
	TaxIncluded     bool   `json:"taxIncluded"`
	PaidOn          string `json:"paidOn"`
	NumberOfProduct int    `json:"numberOfProduct"`
	Amount          int    `json:"amount"`
	ProductName     string `json:"productName"`
	CategoryID      string `json:"categoryId"`
	UserID          string `json:"userId"`
}

type DeletePayment struct {
	ID     string `json:"id"`
	UserID string `json:"userId"`
}

type UpdatePayment struct {
	ID              string `json:"id"`
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
		Pk:              int(entity.Pk),
		ID:              entity.Id,
		TaxIncluded:     entity.TaxIncluded,
		PaidOn:          lib.TimeToString(entity.PaidOn),
		NumberOfProduct: entity.NumberOfProduct,
		Amount:          entity.Amount,
		UserID:          entity.UserId,
		CategoryID:      entity.CategoryId,
		ProductID:       entity.ProductId,
		CreatedAt:       entity.CreatedAt.String(),
		UpdatedAt:       entity.UpdatedAt.String(),
	}
}

func PaymentToConnection(payments []*Payment, page PaginationInput) *PaymentConnection {
	if len(payments) == 0 {
		return &PaymentConnection{PageInfo: &PageInfo{}}
	}

	pageInfo := PageInfo{}
	if page.First != nil {
		if len(payments) >= *page.First+1 {
			pageInfo.HasNextPage = true
			payments = payments[:*page.First]
		}
	}

	paymentsEdges := make([]*PaymentEdge, len(payments))

	for index, payment := range payments {
		cursor := createCursor(
			CursorResource{
				Name: "Payment",
				Pk:   strconv.Itoa(payment.Pk),
			},
			nil,
		)

		paymentsEdges[index] = &PaymentEdge{
			Cursor: cursor,
			Node:   payment,
		}
	}

	if page.First != nil && len(payments) >= *page.First+1 {
		pageInfo.EndCursor = paymentsEdges[*page.First-1].Cursor
	} else {
		pageInfo.EndCursor = paymentsEdges[len(payments)-1].Cursor
	}

	return &PaymentConnection{
		Edges:    paymentsEdges,
		PageInfo: &pageInfo,
	}
}
