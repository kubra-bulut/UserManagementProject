import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const UserForm = () => {
    const [user, setUser] = useState({ name: "", email: "" });
    const router = useRouter();
    const { id } = router.query;
    const isNewUser = !id;

    useEffect(() => {
        if (!isNewUser && id) {
            axios
                .get(`http://localhost:8080/user?id=${id}`)
                .then((response) => setUser(response.data))
                .catch((err) => console.error(err));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = isNewUser ? "http://localhost:8080/user/save" : "http://localhost:8080/user/update";
        
        if (isNewUser) {
            axios
                .post(url, user)
                .then(() => router.push("/"))
                .catch((err) => console.error(err));
        } else {
            axios
                .put(url, user)
                .then(() => router.push("/"))
                .catch((err) => console.error(err));
        }
    };

    return (
        <div>
            <h1>{isNewUser ? "Create User" : "Edit User"}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">{isNewUser ? "Create" : "Save"}</button>
                <button type="button" onClick={() => router.push("/")}>
                    Back
                </button>
            </form>
        </div>
    );
};

export default UserForm;
