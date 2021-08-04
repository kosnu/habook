package model

import (
	"encoding/base64"
	"errors"
	"fmt"
	"log"
	"strings"

	"gorm.io/gorm"
)

type Connection interface {
	IsConnection()
}

type Edge interface {
	IsEdge()
}

type Node interface {
	IsNode()
}

type PageInfo struct {
	EndCursor   string `json:"endCursor"`
	HasNextPage bool   `json:"hasNextPage"`
}

type PaginationInput struct {
	First *int    `json:"first"`
	After *string `json:"after"`
}

type CursorResource struct {
	Name string
	Pk   string
}

type direction string

var (
	asc  direction = "asc"
	desc direction = "desc"
)

func PageDB(db *gorm.DB, dir direction, page PaginationInput) (*gorm.DB, error) {
	var limit int
	if page.First == nil {
		limit = 11
	} else {
		limit = *page.First + 1
	}

	if page.After != nil {
		resourceFirst, resourceSecond, err := decodeCursor(*page.After)
		if err != nil {
			log.Fatalln(err)
			return db, nil
		}

		if resourceSecond != nil {
			switch dir {
			case asc:
				db = db.Where("pk >= ?", resourceSecond.Pk)
			case desc:
				db = db.Where("pk <= ?", resourceSecond.Pk)
			}
		} else {
			switch dir {
			case asc:
				db = db.Where("pk > ?", resourceFirst.Pk)
			case desc:
				db = db.Where("pk < ?", resourceFirst.Pk)
			}
		}
	}
	switch dir {
	case asc:
		db = db.Order("pk ASC")
	case desc:
		db = db.Order("pk DESC")
	}

	return db.Limit(limit), nil
}

func createCursor(first CursorResource, second *CursorResource) string {
	var cursor []byte
	if second != nil {
		cursor = []byte(fmt.Sprintf("%s_%s_%s_%s", first.Name, first.Pk, second.Name, second.Pk))
	} else {
		cursor = []byte(fmt.Sprintf("%s_%s", first.Name, first.Pk))
	}
	return base64.StdEncoding.EncodeToString(cursor)
}

func decodeCursor(cursor string) (CursorResource, *CursorResource, error) {
	bytesCursor, err := base64.StdEncoding.DecodeString(cursor)
	if err != nil {
		return CursorResource{}, nil, err
	}

	cursorValues := strings.Split(string(bytesCursor), "_")

	switch len(cursorValues) {
	case 2:
		return CursorResource{Name: cursorValues[0], Pk: cursorValues[1]}, nil, nil
	case 4:
		return CursorResource{
				Name: cursorValues[0], Pk: cursorValues[1],
			}, &CursorResource{
				Name: cursorValues[2], Pk: cursorValues[3],
			}, nil
	default:
		return CursorResource{}, nil, errors.New("invalid_cursor")
	}
}
