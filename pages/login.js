import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
  e.preventDefault();
  setError("");

  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (!res.ok) {
    setError(data.message || "Login failed");
    return;
  }

  localStorage.setItem("adminLoggedIn", "true");
  localStorage.setItem("adminRole", data.role);

  router.push("/");
}

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          {error && <p style={errorStyle}>{error}</p>}

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
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
  width: 360,
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
  backgroundColor: "#f97316",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: 10
};

const errorStyle = {
  color: "#fca5a5",
  marginBottom: 10,
  fontSize: 14,
  textAlign: "center"
};
