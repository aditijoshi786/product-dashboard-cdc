import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url, {
    headers: {
      "x-admin-role":
        typeof window !== "undefined"
          ? localStorage.getItem("adminRole")
          : ""
    }
  }).then((res) => res.json());

export default function AdminsPage() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (isLoggedIn !== "true") {
      router.replace("/login");
      return null;
    }
  }

  const adminRole =
    typeof window !== "undefined"
      ? localStorage.getItem("adminRole")
      : null;

  const {
    data: admins,
    error,
    mutate
  } = useSWR("/api/admin/list", fetcher);

  if (error) {
    return (
      <p style={{ color: "red", padding: 40 }}>
        Failed to load admins
      </p>
    );
  }

  if (!admins) {
    return null;
  }

  async function handleDeleteAdmin(adminId) {
    await fetch("/api/admin/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminId })
    });

    mutate(); 
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
                      onClick={() =>
                        handleDeleteAdmin(admin._id)
                      }
                      style={deleteBtn}
                      disabled={admin.role === "supreme"}
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
  textAlign: "center"
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
