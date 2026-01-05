import ValueChart from "../components/ValueChart";
import StockChart from "../components/StockChart";
import useSWR from "swr";
import { connectDB } from "../lib/mongodb";
import Product from "../models/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const fetcher=(url)=>fetch(url).then((res)=>res.json());
export default function Home({ initialProducts }) {
  const router=useRouter();
const [authChecked,setAuthChecked]=useState(false);
useEffect(()=>{
const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");

if(isAdminLoggedIn !=="true") { router.replace("/login");}
else {setAuthChecked(true);}
}, []);

const {data,mutate}=useSWR("/api/products",fetcher,{
    fallbackData: initialProducts
  });

const products=Array.isArray(data) ? data:[];
const [errors,setErrors]=useState([]);
const [editingId, setEditingId]=useState(null);
const toBase64=(file)=>
new Promise((resolve, reject)=>{
const reader=new FileReader();
reader.readAsDataURL(file);
reader.onload=()=>resolve(reader.result);
reader.onerror=reject;
  });

async function handleSubmit(e) {
  e.preventDefault();
  setErrors([]);
  const name=e.target.name.value.trim();
  const price=Number(e.target.price.value);
  const stock=Number(e.target.stock.value);

  if (!/^[A-Za-z ]+$/.test(name)) {
    setErrors(["Product name must contain only letters"]);
    return;
    }

  if (Number.isNaN(price) || price <= 0) {
    setErrors(["Price must be a positive number"]);
    return;
    }

  if (Number.isNaN(stock) || stock < 0) {
    setErrors(["Stock must be greater than equal to 0"]);
    return;
    }
  const fileInput=e.target.querySelector('input[type="file"]');
  const file=fileInput.files[0];
  let image="";

    if(file){
      image=await toBase64(file);
    }

  const payload={ name, price, stock, image };
  const url=editingId? `/api/products?id=${editingId}`:"/api/products";
  const method=editingId ?"PUT":"POST";

  let res, result;

  try {
    res=await fetch(url,{
       method,
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(payload)
      });
      result=await res.json();
    } catch {
      setErrors(["Network error"]);
      return;
    }

    if (!res.ok) {
      setErrors(result?.errors || ["Something went wrong"]);
      return;
    }

    mutate();
    setEditingId(null);
    e.target.reset();
  } 

    function handleLogout() {
    localStorage.removeItem("adminLoggedIn");
    router.push("/login");
  }
 if (!authChecked) {
  return null;
}

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#18181b",
        padding: 30,
        fontFamily: "Arial"
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30
  }}
>
  <h1 style={{ color: "white" }}>
    Product Management Dashboard
  </h1>

  <div style={{ display: "flex", gap: 10 }}>
    <button
      onClick={() => router.push("/admins")}
      style={{
        backgroundColor: "#2563eb",
        color: "white",
        padding: "8px 16px",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Manage Admins
    </button>

    <button
      onClick={handleLogout}
      style={{
        backgroundColor: "#ef4444",
        color: "white",
        padding: "8px 16px",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Logout
    </button>
  </div>
</div>



        {errors.length > 0 && (
          <div style={errorBox}>
            {errors.map((e, i) => (
              <div key={i}>• {e}</div>
            ))}
          </div>
        )}

  
    <div style={formCardStyle}>
    <h2 style={{ marginBottom: 15, color: "white" }}>
      {editingId ? "Edit Product" : "Add Product"}
      </h2>

          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Product name" style={inputStyle} />
            <input name="price" type="number" placeholder="Price" style={inputStyle} />
            <input name="stock" type="number" placeholder="Stock" style={inputStyle} />
            <input type="file" accept="image/*" style={{ marginBottom: 15 }} />

            <button style={primaryBtn}>
              {editingId ? "Update Product" : "Add Product"}
            </button>

            {editingId && (
              <button
                type="button"
                style={secondaryBtn}
                onClick={() => {
                  setEditingId(null);
                  setErrors([]);
                  document.querySelector("form").reset();
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        
<div style={whiteCardStyle}>
  <h2 style={sectionTitle}>Products</h2>

  {products.length===0 && <p>No products yet</p>}

  {products.length > 0 && (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thLight}>Name</th>
          <th style={thLight}>Price</th>
          <th style={thLight}>Stock</th>
          <th style={thLight}>Status</th>
          <th style={thLight}>Image</th>
          <th style={thLight}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => {
          const isLowStock = p.stock <= 5;

          return (
            <tr key={p._id}>
              <td style={tdLight}>{p.name}</td>
              <td style={tdLight}>₹{p.price}</td>
              <td style={tdLight}>{p.stock}</td>

              <td style={tdLight}>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: "bold",
                    backgroundColor: isLowStock ? "#fee2e2" : "#dcfce7",
                    color: isLowStock ? "#991b1b" : "#166534"
                  }}
                >
                  {isLowStock ? "LOW STOCK" : "IN STOCK"}
                </span>
              </td>

              <td style={tdLight}>
                {p.image && (
                  <img
                    src={p.image}
                    width="45"
                    height="45"
                    style={{
                      objectFit: "cover",
                      borderRadius: 4,
                      border: "1px solid #d1d5db"
                    }}
                  />
                )}
              </td>

              <td style={tdLight}>
                <button
                  onClick={() => {
                    setEditingId(p._id);
                    document.querySelector('input[name="name"]').value = p.name;
                    document.querySelector('input[name="price"]').value = p.price;
                    document.querySelector('input[name="stock"]').value = p.stock;
                  }}
                >
                  Edit
                </button>

                <button
                  style={{ marginLeft: 6 }}
                  onClick={async () => {
                    await fetch(`/api/products?id=${p._id}`, {
                      method: "DELETE"
                    });
                    mutate();
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )}
</div>

       
<div style={{ display:"flex", justifyContent:"space-between", gap:20 }}>
  <div style={whiteChartCard}>
    
    <StockChart products={products} />
  </div>

  <div style={whiteChartCard}>
    
    <ValueChart products={products} />
  </div>
</div>

</div>
</div>
  );
}


const errorBox = {
  color: "#fca5a5",
  border: "1px solid #7f1d1d",
  padding: 10,
  borderRadius: 6,
  marginBottom: 20
};

const formCardStyle = {
  backgroundColor: "#27272a",
  padding: 24,
  borderRadius: 10,
  border: "1px solid #3f3f46",
  marginBottom: 40,
  boxShadow: "0 8px 20px rgba(0,0,0,0.35)"
};

const whiteCardStyle = {
  backgroundColor: "white",
  padding: 24,
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  marginBottom: 40,
  boxShadow: "0 8px 20px rgba(0,0,0,0.12)"
};

const whiteChartCard = {
  backgroundColor: "white",
  padding: 24,
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  width: "48%",
  boxShadow: "0 8px 20px rgba(0,0,0,0.12)"
};

const sectionTitle = {
  marginBottom: 15,
  paddingBottom: 8,
  borderBottom: "2px solid #e5e7eb",
  color: "#111827"
};

const chartTitle = {
  marginBottom: 10,
  color: "#111827"
};

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 5,
  border: "1px solid #3f3f46",
  backgroundColor: "#18181b",
  color: "#fafafa"
};

const primaryBtn = {
  backgroundColor: "#f97316",
  color: "white",
  padding: "10px 18px",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "bold"
};

const secondaryBtn = {
  marginLeft: 10,
  backgroundColor: "#e5e7eb",
  color: "#111827",
  padding: "10px 18px",
  border: "1px solid #d1d5db",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "bold"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  border: "1px solid #e5e7eb"
};

const thLight = {
  textAlign: "left",
  padding: 10,
  borderBottom: "1px solid #e5e7eb",
  backgroundColor: "#f9fafb",
  color: "#111827"
};

const tdLight = {
  padding: 10,
  borderBottom: "1px solid #e5e7eb",
  color: "#111827"
};

export async function getServerSideProps() {
  await connectDB();
  const products = await Product.find().lean();

  return {
    props: {
      initialProducts: JSON.parse(JSON.stringify(products))
    }
  };
}
