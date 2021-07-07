package entity

import "time"

type Product struct {
	Id        string
	Name      string
	CreatedAt time.Time
	UpdatedAt time.Time
}
