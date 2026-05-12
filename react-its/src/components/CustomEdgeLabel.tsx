import { EdgeLabelRenderer, BaseEdge, getBezierPath } from "@xyflow/react";

type Props = {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: any;
  targetPosition: any;
  data?: {
    props?: Record<string, any>;
  };
};

export default function CustomEdgeLabel({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: Props) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const props = data?.props ?? {};

  return (
    <>
      <BaseEdge id={id} path={edgePath} />

      {Object.keys(props).length > 0 && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: "#1f2937",
              color: "white",
              padding: "6px 10px",
              borderRadius: 8,
              fontSize: 11,
              pointerEvents: "all",
              maxWidth: 200,
              width: 140, // Force a fixed width
              wordBreak: "break-word", // Ensure long strings wrap
              zIndex: 10, // Ensure labels stay above lines
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {Object.entries(props)
                .slice(0, 4)
                .map(([key, value]) => (
                  <div key={key}>
                    <span style={{ opacity: 0.7 }}>{key}:</span>{" "}
                    <span>{String(value)}</span>
                  </div>
                ))}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
