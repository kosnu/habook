package model

import "github.com/kosnu/habook-backend/entity"

func UserFromEntity(entity *entity.User) *User {
	return &User{
		ID:        entity.Id,
		Name:      entity.Name,
		Enable:    entity.Enable,
		CreatedAt: entity.CreatedAt.String(),
		UpdatedAt: entity.UpdatedAt.String(),
	}
}
