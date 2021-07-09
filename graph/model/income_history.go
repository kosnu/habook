package model

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
