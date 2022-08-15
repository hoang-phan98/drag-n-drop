import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Zone } from "./Playground";

export interface DroppableZoneProps {
  zone: Zone;
  children?: ReactNode;
}

export const DroppableZone = ({ zone, children }: DroppableZoneProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: zone.id,
  });

  return (
    <div
      className={`droppable-zone ${isOver ? "is-over" : ""}`}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};
