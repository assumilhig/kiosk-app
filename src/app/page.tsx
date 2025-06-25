"use client";

import axios from "@/lib/axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<any>([]);

  const fetchUsers = async () => {
    const res = await axios.get("/api/users");
    setUsers(res.data);
  };

  const deleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await axios
      .delete(`/api/users?id=${id}`)
      .then(({ data }) => console.log(data.message));
    fetchUsers(); // Refresh list after delete
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="space-y-2">
        {users.map((user: any) => (
          <li key={user.ID} className="p-3 border rounded">
            <div>
              <strong>Name:</strong> {user.FullName}
            </div>
            <div>
              <strong>Email:</strong> {user.EmailAddress}
            </div>
            <button
              onClick={() => deleteUser(user.ID)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
