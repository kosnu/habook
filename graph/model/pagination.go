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
	Name      string
	ID        string
	CreatedAt string
}

type direction string

var (
	asc  direction = "asc"
	desc direction = "desc"
)

func PageDB(db *gorm.DB, col string, dir direction, page PaginationInput) (*gorm.DB, error) {
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
				db = db.Where(
					fmt.Sprintf("(%s > ?) OR (%s = ? AND created_at > ?)", col, col),
					resourceFirst.CreatedAt, resourceFirst.CreatedAt, resourceSecond.CreatedAt,
				)
			case desc:
				db = db.Where(
					fmt.Sprintf("(%s < ?) OR (%s = ? AND created_at < ?)", col, col),
					resourceFirst.CreatedAt, resourceFirst.CreatedAt, resourceSecond.CreatedAt,
				)
			}
		} else {
			switch dir {
			case asc:
				db = db.Where(fmt.Sprintf("%s > ?", col), resourceFirst.CreatedAt)
			case desc:
				db = db.Where(fmt.Sprintf("%s < ?", col), resourceFirst.CreatedAt)
			}
		}
	}
	switch dir {
	case asc:
		db = db.Order(fmt.Sprintf("%s IS NULL ASC, created_at ASC", col))
	case desc:
		db = db.Order(fmt.Sprintf("%s DESC, id DESC", col))
	}

	return db.Limit(limit), nil
}

func createCursor(first CursorResource, second *CursorResource) string {
	var cursor []byte
	if second != nil {
		cursor = []byte(fmt.Sprintf("%s_%s_%s_%s_%s_%s", first.Name, first.ID, first.CreatedAt, second.Name, second.ID, second.CreatedAt))
	} else {
		cursor = []byte(fmt.Sprintf("%s_%s_%s", first.Name, first.ID, first.CreatedAt))
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
	case 3:
		return CursorResource{Name: cursorValues[0], ID: cursorValues[1], CreatedAt: cursorValues[2]}, nil, nil
	case 6:
		return CursorResource{
				Name: cursorValues[0], ID: cursorValues[1], CreatedAt: cursorValues[2],
			}, &CursorResource{
				Name: cursorValues[3], ID: cursorValues[4], CreatedAt: cursorValues[5],
			}, nil
	default:
		return CursorResource{}, nil, errors.New("invalid_cursor")
	}
}
