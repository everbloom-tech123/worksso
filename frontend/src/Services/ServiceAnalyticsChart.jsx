import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

const ServiceAnalyticsChart = ({ services }) => {
  const now = new Date();

  const data = [
    { name: "Active", value: 0 },
    { name: "Expiring Soon", value: 0 },
    { name: "Expired", value: 0 },
  ];

  services.forEach((service) => {
    const expiryDate = new Date(service.expiresAt);
    const minutesLeft = Math.ceil((expiryDate - now) / (1000 * 60));

    if (minutesLeft <= 0) data[2].value++;
    else if (minutesLeft <= 5) data[1].value++;
    else data[0].value++;
  });

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ServiceAnalyticsChart;
