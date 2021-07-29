package relay

import (
	"encoding/base64"
	"errors"
	"fmt"
	"strings"
)

type CursorResource struct {
	Name string
	ID   string
}

func CreateCursor(first CursorResource, second *CursorResource) string {
	var cursor []byte
	if second != nil {
		cursor = []byte(fmt.Sprintf("%s:%s:%s:%s", first.Name, first.ID, second.Name, second.ID))
	} else {
		cursor = []byte(fmt.Sprintf("%s:%s", first.Name, first.ID))
	}
	return base64.StdEncoding.EncodeToString(cursor)
}

func decodeCursor(cursor string) (CursorResource, *CursorResource, error) {
	bytesCursor, err := base64.StdEncoding.DecodeString(cursor)
	if err != nil {
		return CursorResource{}, nil, err
	}

	cursorValues := strings.Split(string(bytesCursor), ":")

	switch len(cursorValues) {
	case 2:
		return CursorResource{Name: cursorValues[0], ID: cursorValues[1]}, nil, nil
	case 4:
		return CursorResource{
				Name: cursorValues[0], ID: cursorValues[1],
			}, &CursorResource{
				Name: cursorValues[2], ID: cursorValues[3],
			}, nil
	default:
		return CursorResource{}, nil, errors.New("invalid_cursor")
	}
}
