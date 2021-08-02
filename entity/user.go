package entity

import "time"

type User struct {
	Pk        uint `gorm:"primaryKey"`
	Id        string
	Name      string
	Enable    bool
	CreatedAt time.Time
	UpdatedAt time.Time
}
