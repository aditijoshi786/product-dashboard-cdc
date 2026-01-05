import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminsPage() {
  const router = useRouter();

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const adminRole =
    typeof window !== "undefined"
      ? localStorage.getItem("adminRole")
      : null;

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");

    if (isLoggedIn !== "true") {
      router.replace("/login");
      return;
    }

    fetchAdmins();
  }, []);

 async function fetchAdmins() {
  try {
    const role = localStorage.getItem("adminRole");

    const res = await fetch("/api/admin/list", {
      headers: {
        "x-admin-role": role
      }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to load admins");
    }

    setAdmins(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}


  async function handleDeleteAdmin(adminId) {
  const role = localStorage.getItem("adminRole");

  const res = await fetch("/api/admin/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      adminId,
      requesterRole: role
    })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  fetchAdmins();
}

  if (loading) {
    return <p style={{ padding: 40 }}>Loading admins...</p>;
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  }}
>
  <h2 style={titleStyle}>Admin Management</h2>

  <button
    onClick={() => router.push("/add-admin")}
    style={{
      backgroundColor: "#22c55e",
      color: "white",
      padding: "8px 14px",
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    + Add Admin
  </button>
</div>


        {error && <p style={errorStyle}>{error}</p>}

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Role</th>
              {adminRole === "supreme" && (
                <th style={thStyle}>Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td style={tdStyle}>{admin.username}</td>
                <td style={tdStyle}>{admin.role}</td>

                {adminRole === "supreme" && (
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleDeleteAdmin(admin._id)}
                      style={deleteBtn}
                      disabled={admin.role === "supreme"}
                      title={
                        admin.role === "supreme"
                          ? "Supreme admin cannot be deleted"
                          : ""
                      }
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={() => router.push("/")}
          style={backBtn}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#18181b",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Arial"
};

const cardStyle = {
  backgroundColor: "#27272a",
  padding: 30,
  borderRadius: 12,
  width: 520,
  border: "1px solid #3f3f46",
  boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
};

const titleStyle = {
  color: "#fafafa",
  textAlign: "center",
  marginBottom: 20
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: 20
};

const thStyle = {
  textAlign: "left",
  padding: 10,
  borderBottom: "1px solid #3f3f46",
  color: "#e5e7eb"
};

const tdStyle = {
  padding: 10,
  borderBottom: "1px solid #3f3f46",
  color: "#fafafa"
};

const deleteBtn = {
  backgroundColor: "#ef4444",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: 4,
  cursor: "pointer"
};

const backBtn = {
  width: "100%",
  marginTop: 10,
  backgroundColor: "transparent",
  color: "#a1a1aa",
  border: "none",
  cursor: "pointer",
  fontSize: 13
};

const errorStyle = {
  color: "#fca5a5",
  textAlign: "center",
  marginBottom: 10
};