import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function AddAdminPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");

    if (isLoggedIn !== "true") {
      router.replace("/login");
    }
  }, []);
  async function handleCreateAdmin(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const role = localStorage.getItem("adminRole");

const res = await fetch("/api/admin/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-admin-role": role
  },
  body: JSON.stringify({ username, password })
});


      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create admin");
        return;
      }

      setMessage("Admin created successfully");
      setUsername("");
      setPassword("");
    } catch {
      setError("Network error");
    }
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Add New Admin</h2>

        <form onSubmit={handleCreateAdmin}>
          <input
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          {error && <p style={errorStyle}>{error}</p>}
          {message && <p style={successStyle}>{message}</p>}

          <button type="submit" style={buttonStyle}>
            Create Admin
          </button>
        </form>

        <button
          onClick={() => router.push("/")}
          style={backButtonStyle}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#18181b",
  fontFamily: "Arial"
};

const cardStyle = {
  backgroundColor: "#27272a",
  padding: 30,
  borderRadius: 12,
  width: 380,
  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
  border: "1px solid #3f3f46"
};

const titleStyle = {
  color: "#fafafa",
  textAlign: "center",
  marginBottom: 20
};

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 6,
  border: "1px solid #3f3f46",
  backgroundColor: "#18181b",
  color: "#fafafa",
  fontSize: 14
};

const buttonStyle = {
  width: "100%",
  padding: 12,
  backgroundColor: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: 10
};

const backButtonStyle = {
  width: "100%",
  marginTop: 14,
  backgroundColor: "transparent",
  color: "#a1a1aa",
  border: "none",
  cursor: "pointer",
  fontSize: 13
};

const errorStyle = {
  color: "#fca5a5",
  fontSize: 14,
  textAlign: "center",
  marginBottom: 10
};

const successStyle = {
  color: "#86efac",
  fontSize: 14,
  textAlign: "center",
  marginBottom: 10
};
