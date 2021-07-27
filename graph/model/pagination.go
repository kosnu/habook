package model

type Connection interface {
	IsConnection()
}

type Edge interface {
	IsEdge()
}

type Node interface {
	IsNode()
}

type PageInfo struct {
	EndCursor   string `json:"endCursor"`
	HasNextPage bool   `json:"hasNextPage"`
}

type PaginationInput struct {
	First *int    `json:"first"`
	After *string `json:"after"`
}
