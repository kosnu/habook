package entity

import "time"

type User struct {
	Id        string
	Name      string
	Enable    bool
	CreatedAt time.Time
	UpdatedAt time.Time
}
