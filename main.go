package main

import (
	"UserManagementProject/db"
	"UserManagementProject/userHandler"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	// Initialize the database
	db.InitDB()
	defer db.CloseDB()

	// Create a new router using Gorilla Mux
	router := mux.NewRouter()

	// Define routes and handlers
	router.HandleFunc("/api/users", userHandler.GetAllUsers).Methods("GET")
	router.HandleFunc("/api/users/{id:[0-9]+}", userHandler.GetUserByID).Methods("GET")
	router.HandleFunc("/api/users", userHandler.CreateUser).Methods("POST")
	router.HandleFunc("/api/users/{id:[0-9]+}", userHandler.UpdateUser).Methods("PUT")
	router.HandleFunc("/api/users/{id:[0-9]+}", userHandler.DeleteUser).Methods("DELETE")

	corsAllowedHeaders := handlers.AllowedHeaders([]string{"Content-Type"})
	corsAllowedMethods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	corsAllowedOrigins := handlers.AllowedOrigins([]string{"http://localhost:3000"})

	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(corsAllowedHeaders, corsAllowedMethods, corsAllowedOrigins)(router)))
}
