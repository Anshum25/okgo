interface BarChartData {
  name: string;
  value: number;
}

interface SimpleBarChartProps {
  data: BarChartData[];
  height?: number;
}

export function SimpleBarChart({ data, height = 300 }: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const barWidth = 100 / data.length - 2;

  return (
    <div style={{ height, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "8px", paddingBottom: "8px" }}>
        {data.map((item, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: "#7c3aed",
                borderRadius: "8px 8px 0 0",
                minHeight: "4px",
                transition: "all 0.2s",
              }}
              title={`${item.name}: ${item.value}`}
            />
            <span
              style={{
                fontSize: "12px",
                color: "#666",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
              }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
