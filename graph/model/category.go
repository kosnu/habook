package model

import (
	"github.com/kosnu/habook-backend/entity"
	"github.com/kosnu/habook-backend/graph/relay"
)

type Category struct {
	Node
	ID        string `json:"id"`
	Name      string `json:"name"`
	Enable    bool   `json:"enable"`
	UserID    string `json:"user"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

type CategoryConnection struct {
	Edges    []*CategoryEdge `json:"edges"`
	PageInfo *PageInfo       `json:"pageInfo"`
}

func (CategoryConnection) IsConnection() {}

type CategoryEdge struct {
	Cursor string    `json:"cursor"`
	Node   *Category `json:"node"`
}

func (CategoryEdge) IsEdge() {}

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

func CategoryToConnection(categories []*Category, page PaginationInput) *CategoryConnection {
	if len(categories) == 0 {
		return &CategoryConnection{PageInfo: &PageInfo{}}
	}

	pageInfo := PageInfo{}
	if page.First != nil {
		if len(categories) >= *page.First+1 {
			pageInfo.HasNextPage = true
			categories = categories[:*page.First]
		}
	}

	categoriesEdges := make([]*CategoryEdge, len(categories))

	for index, category := range categories {
		cursor := relay.CreateCursor(
			relay.CursorResource{
				Name: "Category",
				ID:   category.ID,
			},
			nil,
		)

		categoriesEdges[index] = &CategoryEdge{
			Cursor: cursor,
			Node:   category,
		}
	}

	if page.First != nil && len(categories) >= *page.First+1 {
		pageInfo.EndCursor = categoriesEdges[*page.First-1].Cursor
	} else {
		pageInfo.EndCursor = categoriesEdges[len(categories)-1].Cursor
	}

	return &CategoryConnection{
		Edges:    categoriesEdges,
		PageInfo: &pageInfo,
	}
}
