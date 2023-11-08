import BarComponent from "./Components/Bar/Bar";
import DonutComponent from "./Components/Donut/Donut";
import TableComponent from "./Components/Table/Table";
import TreeMapComponent from "./Components/Treemap/Treemap";
const data = [
  { label: "HTTP", value: 85, color: "#89ee6a" },
  { label: "HTTPS", value: 75, color: "#0f172a" },
  { label: "SSH", value: 65, color: "#1e293b" },
  { label: "FTP", value: 55, color: "#334155" },
  { label: "SMTP", value: 45, color: "#475569" },
  { label: "TELNET", value: 35, color: "#64748b" },
  { label: "POP3", value: 25, color: "#3f3f46" },
  { label: "PPP", value: 15, color: "#44403c" },
];

const treeMapData = {
  label: "Root",
  children: [
    { label: "Axis", value: 180, color: "#917dd8" },
    { label: "TooltipControl", value: 50, color: "#917dd8" },
    { label: "SelectionControl", value: 22, color: "#917dd8" },
    { label: "D", value: 40, color: "#917dd8" },
    { label: "E", value: 50, color: "#917dd8" },
    { label: "F", value: 60, color: "#917dd8" },
    { label: "F", value: 60, color: "#917dd8" },
    { label: "F", value: 60, color: "#917dd8" },
    { label: "F", value: 60, color: "#917dd8" },
    { label: "F", value: 60, color: "#917dd8" },
    { label: "F", value: 60, color: "#917dd8" },
    { label: "F", value: 60, color: "#917dd8" },
    { label: "F", value: 60, color: "#917dd8" },
    { label: "F", value: 60, color: "#917dd8" },
    { label: "F", value: 60, color: "#917dd8" },
    { label: "F", value: 60, color: "#917dd8" },
  ],
};

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 m-2">
        <BarComponent data={data} width={400} height={400} />
        <TableComponent
          title="IP"
          tableHeads={["IP", "Traffic", "Hits"]}
          data="https://jsonplaceholder.typicode.com/todos"
        />
        <DonutComponent data={data} width={400} height={400} />
        <TreeMapComponent data={treeMapData} width={400} height={400} />
        <TableComponent
          title="Domain"
          tableHeads={["Domain", "Traffic", "Hits"]}
          data="https://jsonplaceholder.typicode.com/comments"
        />
        <TableComponent
          title="Sub Domain"
          tableHeads={["Sub Domain", "Traffic", "Hits"]}
          data="https://jsonplaceholder.typicode.com/posts"
        />
      </div>
    </>
  );
}
