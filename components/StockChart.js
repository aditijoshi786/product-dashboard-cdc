import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function StockChart({ products }) {
  const data = Array.isArray(products) ? products : [];

  return (
    <div style={{ width: "100%", height: 350 }}>
     <h3 style={{ color: "#111827", fontWeight: "bold", marginBottom: 10 }}>
  Stock per Product
</h3>


  <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />

          <XAxis
  dataKey="name"
  stroke="#111827"
  tick={{ fill: "#111827", fontSize: 12 }}
  angle={-20}
  textAnchor="end"
/>


   <YAxis
  stroke="#111827"
  tick={{ fill: "#111827", fontSize: 12 }}
  allowDecimals={false}
  domain={[0, "dataMax + 5"]}
/>

      <Tooltip
            contentStyle={{ backgroundColor: "#222", border: "1px solid #555" }}
            labelStyle={{ color: "#fff" }}
            formatter={(value) => [`Stock: ${value}`, ""]}
        />

          <Bar
            dataKey="stock"
            fill="#4ade80"   
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
