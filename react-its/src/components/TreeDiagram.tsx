import { useEffect, useState } from "react";
import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { ParsedComponent } from "../types";

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

export default function TreeDiagram({
  treeData,
}: {
  treeData: ParsedComponent[];
}) {
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);

  useEffect(() => {
    if (!treeData.length) return;

    let i = 0;
    const newNodes = treeData.map((comp) => ({
      id: `n${i++}`,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: comp.id },
    }));
    setNodes(newNodes);

    const newEdges = treeData
      .filter((comp) => comp.parent)
      .map((comp) => ({
        id: `e${comp.parent}-${comp.id}`,
        source: `n${treeData.findIndex((c) => c.id === comp.parent)}`,
        target: `n${treeData.findIndex((c) => c.id === comp.id)}`,
        label: Object.keys(comp.props).join(", "),
      }));
    setEdges(newEdges);
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
