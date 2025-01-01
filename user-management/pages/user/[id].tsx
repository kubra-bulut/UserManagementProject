// pages/user/[id].tsx
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField } from '@mui/material';

const UserForm = () => {
    const router = useRouter();
    const { id } = router.query;
    const isNewUser = id === "new";
    const [user, setUser] = useState({ name: "", email: "" });

    useEffect(() => {
        if (!isNewUser) {
            axios.get(`http://localhost:8080/api/users/${id}`)
                .then(response => setUser(response.data))
                .catch(err => console.error(err));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = isNewUser ? "http://localhost:8080/api/users" : `http://localhost:8080/api/users/${id}`;
        const method = isNewUser ? axios.post : axios.put;

        method(url, user)
            .then(() => router.push("/"))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>{isNewUser ? "Create User" : "Edit User"}</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <div>
                    <Button type="submit" variant="contained" color="primary">
                        {isNewUser ? "Create" : "Save"}
                    </Button>
                    <Button 
                        type="button" 
                        variant="outlined" 
                        color="secondary" 
                        onClick={() => router.push("/")}
                    >
                        Back
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
