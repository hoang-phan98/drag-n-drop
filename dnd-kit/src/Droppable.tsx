import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

export interface DroppableProps {
  children?: ReactNode;
}

export const Droppable = ({ children }: DroppableProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
