package external

import (
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func ConnectDatabase() (*gorm.DB, error) {
	dsn := "habook:habook@tcp(127.0.0.1:3306)/habook?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	err = db.AutoMigrate()
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	return db, err
}
