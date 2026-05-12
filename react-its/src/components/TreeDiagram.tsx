import { useEffect } from "react";
import { ReactFlow, useNodesState, useEdgesState } from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import "@xyflow/react/dist/style.css";
import type { ParsedComponent } from "../types";
import CustomEdgeLabel from "./CustomEdgeLabel";

export default function TreeDiagram({
  treeData,
}: {
  treeData: ParsedComponent[];
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Helper to calculate layout
  const getLayoutedElements = (nodes: any[], edges: any[]) => {
    const nodeWidth = 172;
    const nodeHeight = 36;

    dagreGraph.setGraph({
      rankdir: "TB",
      ranksep: 120, // Increase this (default is 50). This pushes rows apart vertically.
      nodesep: 100, // Increase this (default is 50). This pushes nodes apart horizontally.
    });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };
    });

    return { nodes: layoutedNodes, edges };
  };

  const edgeTypes = {
    custom: CustomEdgeLabel,
  };

  useEffect(() => {
    if (!treeData.length) return;

    // 1. Create raw nodes and edges from treeData
    const initialNodes = treeData.map((comp) => ({
      id: comp.id, // Using comp.id directly is safer than indexing
      data: { label: comp.id },
      position: { x: 0, y: 0 }, // Position is temporary
    }));
    const initialEdges = treeData
      .filter((comp) => comp.parent)
      .map((comp) => ({
        id: `e-${comp.parent}-${comp.id}`,
        source: comp.parent!,
        target: comp.id,
        type: "custom",
        data: {
          props: comp.props,
        },
      }));

    // 2. Apply Dagre Layout
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes,
      initialEdges,
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [treeData, setNodes, setEdges]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{
          padding: 0.4, // Increase this number to "zoom out" more (0.1 is default)
          maxZoom: 0.8, // Prevents the graph from ever becoming "too big"
        }}
      />
    </div>
  );
}
