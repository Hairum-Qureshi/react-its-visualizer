import { useEffect, useState } from "react";
import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const defaultNodes = [
  { id: "n1", position: { x: 250, y: 50 }, data: { label: "App" } },
  {
    id: "n2",
    position: { x: 400, y: 150 },
    data: { label: "AuthGuard" },
  },
  {
    id: "n3",
    position: { x: 100, y: 150 },
    data: { label: "Navbar" },
  },
  {
    id: "n4",
    position: { x: 400, y: 250 },
    data: { label: "Profile" },
  },
];

const defaultEdges = [
  { id: "n1-n2", source: "n1", target: "n2" },
  { id: "n1-n3", source: "n1", target: "n3" },
  { id: "n2-n4", source: "n2", target: "n4", label: "profileData" },
];

export default function TreeDiagram({ treeData }: { treeData: string }) {
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);

  useEffect(() => {
    if (!treeData) return;

    try {
      const cleaned = treeData
        .replace(/^```[a-zA-Z]*\s*/, "")
        .replace(/\s*```$/, "");

      const parsed = JSON.parse(cleaned);
      
      setNodes(parsed.nodes ?? []);
      setEdges(parsed.edges ?? []);
    } catch (err) {
      console.error("Failed to parse treeData:", err);
    }
  }, [treeData]);

  return (
    <ReactFlow
      key={JSON.stringify(nodes) + JSON.stringify(edges)}
      nodes={nodes}
      edges={edges}
      fitView
      onNodeClick={(event, node) =>
        node.data.label === "AuthGuard" && alert("Clicked!")
      }
    />
  );
}
