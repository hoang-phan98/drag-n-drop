import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

import "./DroppableContainer.css";

export interface DroppableContainerBProps {
  children?: ReactNode;
}

export const DroppableContainerB = ({ children }: DroppableContainerBProps) => {
  const { setNodeRef } = useDroppable({
    id: "droppable-b",
  });

  return (
    <div className="droppable-b-container" ref={setNodeRef}>
      {children}
    </div>
  );
};
