package entity

import "time"

type Payment struct {
	Id              string
	TaxIncluded     bool
	PaidOn          string
	NumberOfProduct int
	Amount          int
	ProductId       string
	CategoryId      string
	UserId          string `gorm:"foreignKey:Id"`
	CreatedAt       time.Time
	UpdatedAt       time.Time
}
