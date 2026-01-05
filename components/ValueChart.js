import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function ValueChart({ products }) {
  const data = Array.isArray(products)
    ? products.map(p => ({
        name: p.name,
        totalValue: p.price * p.stock
      }))
    : [];

  return (
    <div style={{ width: "100%", height: 350, marginTop: 40 }}>
      <h3 style={{ color: "#111827", fontWeight: "bold", marginBottom: 10 }}>Total Inventory Value per Product
</h3>


      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />

          <XAxis
  dataKey="name"
  tick={{ fill: "#111827", fontSize: 12 }}
  angle={-20}
  textAnchor="end"
/>


          <YAxis
  tick={{ fill: "#111827", fontSize: 12 }}
  width={50}
  allowDecimals={false}
/>

          <Tooltip
            contentStyle={{ backgroundColor: "#222", border: "1px solid #555" }}
            labelStyle={{ color: "#fff" }}
            formatter={(value) => [`₹ ${value}`, "Total Value"]}
          />

          <Bar
            dataKey="totalValue"
            fill="#60a5fa" 
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
