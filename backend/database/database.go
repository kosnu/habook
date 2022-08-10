package database

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func ConnectDatabase() (*gorm.DB, error) {
	dsn := "habook:habook@tcp(db:3306)/habook?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return db, nil
}
