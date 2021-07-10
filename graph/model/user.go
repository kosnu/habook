package model

import "github.com/kosnu/habook-backend/entity"

type User struct {
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
		ID:        entity.Id,
		Name:      entity.Name,
		Enable:    entity.Enable,
		CreatedAt: entity.CreatedAt.String(),
		UpdatedAt: entity.UpdatedAt.String(),
	}
}
