package entity

import "time"

type Payment struct {
	Pk              uint `gorm:"primaryKey"`
	Id              string
	PaidOn          time.Time
	NumberOfProduct int
	Amount          int
	ProductId       string
	CategoryId      string
	UserId          string `gorm:"foreignKey:Id"`
	CreatedAt       time.Time
	UpdatedAt       time.Time
}
