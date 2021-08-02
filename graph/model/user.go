package model

import "github.com/kosnu/habook-backend/entity"

type User struct {
	Pk        int    `json:"pk"`
	ID        string `json:"id"`
	Name      string `json:"name"`
	Enable    bool   `json:"enable"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

type NewUser struct {
	Name string `json:"name"`
}

func UserFromEntity(entity *entity.User) *User {
	return &User{
		Pk:        int(entity.Pk),
		ID:        entity.Id,
		Name:      entity.Name,
		Enable:    entity.Enable,
		CreatedAt: entity.CreatedAt.String(),
		UpdatedAt: entity.UpdatedAt.String(),
	}
}
