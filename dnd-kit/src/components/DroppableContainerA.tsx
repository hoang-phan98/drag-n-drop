import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

import "./DroppableContainer.css";

export interface DroppableContainerAProps {
  children?: ReactNode;
}

export const DroppableContainerA = ({ children }: DroppableContainerAProps) => {
  const { setNodeRef } = useDroppable({
    id: "droppable-a",
  });

  return (
    <div className="droppable-a-container" ref={setNodeRef}>
      {children}
    </div>
  );
};
