package lib

import "time"

func StringToTime(str string) (time.Time, error) {
	layout := "2006-01-02T15:04:05+09:00"
	t, err := time.Parse(layout, str)
	return t, err
}

func TimeToString(time time.Time) string {
	layout := "2006/01/02"
	str := time.Format(layout)
	return str
}
