package entity

import "time"

type Product struct {
	Pk        uint `gorm:"primaryKey"`
	Id        string
	Name      string
	CreatedAt time.Time
	UpdatedAt time.Time
}
