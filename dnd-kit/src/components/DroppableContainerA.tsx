import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

import "./DroppableContainer.css";

export interface DroppableContainerAProps {
  children?: ReactNode;
}

export const DroppableContainerA = ({ children }: DroppableContainerAProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable-a",
  });
  const style = {
    color: isOver ? "blue" : undefined,
  };

  return (
    <div className="droppable-a-container" ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
