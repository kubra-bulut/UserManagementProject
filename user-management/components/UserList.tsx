import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/users")
            .then(response => setUsers(response.data))
            .catch(err => console.error(err));
    }, []);

    const deleteUser = (id: number) => {
        axios.delete(`http://localhost:8080/user/delete?id=${id}`)
            .then(() => setUsers(users.filter((user: any) => user.id !== id)))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>User Management</h1>
            <button>
                <Link href="/user/new">New</Link>
            </button>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user.id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <button>
                                    <Link href={`/user/${user.id}`}>Edit</Link>
                                </button>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
