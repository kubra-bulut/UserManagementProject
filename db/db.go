package db

import (
	"database/sql"
	"log"

	_ "modernc.org/sqlite"
)

var db *sql.DB

// InitDB initializes the database
func InitDB() {
	var err error
	db, err = sql.Open("sqlite", "./users.db") // SQLite connection
	if err != nil {
		log.Fatal(err)
	}

	// Create the users table if it doesn't exist
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		email TEXT NOT NULL
	)`)
	if err != nil {
		log.Fatal(err)
	}

	// Add some sample data to the database if the table is empty
	addSampleData()
}

// Add sample users if the table is empty
func addSampleData() {
	// Check if the users table is empty
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM users").Scan(&count)
	if err != nil {
		log.Fatal(err)
	}

	// If no users exist, add some sample data
	if count == 0 {
		_, err := db.Exec(`INSERT INTO users (name, email) VALUES
			('John Doe', 'john.doe@example.com'),
			('Jane Smith', 'jane.smith@example.com')`)
		if err != nil {
			log.Fatal(err)
		}
		log.Println("Sample users added to the database")
	}
}

// GetDB returns the database connection
func GetDB() *sql.DB {
	return db
}

// CloseDB closes the database connection
func CloseDB() {
	if err := db.Close(); err != nil {
		log.Fatal(err)
	}
}
