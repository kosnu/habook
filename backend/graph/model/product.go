package model

import (
	"strconv"

	"github.com/kosnu/habook-backend/entity"
)

type Product struct {
	Pk        int    `json:"pk"`
	ID        string `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

func (Product) IsNode() {}

type ProductConnection struct {
	Edges    []*ProductEdge `json:"edges"`
	PageInfo *PageInfo      `json:"pageInfo"`
}

func (ProductConnection) IsConnection() {}

type ProductEdge struct {
	Cursor string   `json:"cursor"`
	Node   *Product `json:"node"`
}

func (ProductEdge) IsEdge() {}

type SearchProduct struct {
	UserID      string  `json:"userId"`
	ProductName *string `json:"productName"`
}

func ProductFromEntity(entity *entity.Product) *Product {
	return &Product{
		Pk:        int(entity.Pk),
		ID:        entity.Id,
		Name:      entity.Name,
		CreatedAt: entity.CreatedAt.String(),
		UpdatedAt: entity.UpdatedAt.String(),
	}
}

func ProductToConnection(products []*Product, page PaginationInput) *ProductConnection {
	if len(products) == 0 {
		return &ProductConnection{PageInfo: &PageInfo{}}
	}

	pageInfo := PageInfo{}
	if page.First != nil {
		if len(products) >= *page.First+1 {
			pageInfo.HasNextPage = true
			products = products[:*page.First]
		}
	}

	productsEdges := make([]*ProductEdge, len(products))

	for index, product := range products {
		cursor := createCursor(
			CursorResource{
				Name: "Product",
				Pk:   strconv.Itoa(product.Pk),
			},
			nil,
		)

		productsEdges[index] = &ProductEdge{
			Cursor: cursor,
			Node:   product,
		}
	}

	if page.First != nil && len(products) >= *page.First+1 {
		pageInfo.EndCursor = productsEdges[*page.First-1].Cursor
	} else {
		pageInfo.EndCursor = productsEdges[len(products)-1].Cursor
	}

	return &ProductConnection{
		Edges:    productsEdges,
		PageInfo: &pageInfo,
	}
}
