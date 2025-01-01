import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<User>({ id: 0, name: "", email: "" });
  const [newUser, setNewUser] = useState<User>({ id: 0, name: "", email: "" });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
  ];

  // Fetching users from api
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data);
      console.log("Users loaded!");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async () => {
    if (!selectedUser) {
      console.error("No user selected for delete");
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/api/users/${selectedUser.id}`);
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setSelectedUser(null);
      console.log(`User with ID ${selectedUser.id} deleted.`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Edit users
  const handleEdit = () => {
    if (!selectedUser) {
      console.error("No user selected for edit");
      return;
    }
    setEditedUser({ ...selectedUser });
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleSave = async () => {
    if (isEditing) {
      // Update edited user
      try {
        await axios.put(`http://localhost:8080/api/users/${editedUser.id}`, editedUser);
        const updatedUsers = users.map((user) =>
          user.id === editedUser.id ? editedUser : user
        );
        setUsers(updatedUsers);
        console.log(`User with ID ${editedUser.id} updated.`);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      // Add new user
      try {
        const response = await axios.post("http://localhost:8080/api/users", newUser);
        const addedUser = response.data;
  
        if (!addedUser.id) {
          addedUser.id = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
        }
  
        setUsers([...users, addedUser]);
        console.log("New user added:", addedUser);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  
    // Dialog ve formları sıfırla
    setOpenDialog(false);
    setIsEditing(false);
    setNewUser({ id: 0, name: "", email: "" });
    setEditedUser({ id: 0, name: "", email: "" });
  };
  

  const handleDialogClose = () => {
    setOpenDialog(false);
    setIsEditing(false);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <Paper
        elevation={3}
        style={{
          backgroundColor: "#fff",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" style={{ marginBottom: "20px", fontWeight: "bold" }}>
          User Management
        </Typography>

        <Box style={{ marginBottom: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              textTransform: "none",
            }}
          >
            Add User
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEdit}
            disabled={!selectedUser}
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              backgroundColor: "#1976D2",
              color: "#fff",
              textTransform: "none",
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDelete}
            disabled={!selectedUser}
            style={{
              padding: "10px 20px",
              backgroundColor: "#d32f2f",
              color: "#fff",
              textTransform: "none",
            }}
          >
            Delete
          </Button>
        </Box>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={users}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => {
              if (newSelection.length > 0) {
                const selectedId = newSelection[0];
                const selected = users.find((user) => user.id === selectedId);
                setSelectedUser(selected || null);
              } else {
                setSelectedUser(null);
              }
            }}
            //pageSize={5}
            //rowsPerPageOptions={[5]}
           // disableSelectionOnClick
          />
        </div>
      </Paper>

      {/* User Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{isEditing ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={isEditing ? editedUser.name : newUser.name}
            onChange={(e) => {
              if (isEditing) {
                setEditedUser({ ...editedUser, name: e.target.value });
              } else {
                setNewUser({ ...newUser, name: e.target.value });
              }
            }}
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            value={isEditing ? editedUser.email : newUser.email}
            onChange={(e) => {
              if (isEditing) {
                setEditedUser({ ...editedUser, email: e.target.value });
              } else {
                setNewUser({ ...newUser, email: e.target.value });
              }
            }}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Back
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;
