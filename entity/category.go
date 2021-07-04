package entity

import "time"

type Category struct {
	Id        string
	Name      string
	Enable    bool
	UserId    string `gorm:"foreignKey:Id"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
