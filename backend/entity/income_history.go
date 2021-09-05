package entity

import "time"

type IncomeHistory struct {
	Pk        uint `gorm:"primaryKey"`
	Id        string
	Income    int
	UserId    string `gorm:"foreignKey:Id"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
