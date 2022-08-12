import { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";

export interface DraggableProps {
  children?: ReactNode;
}

export const Draggable = ({ children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
};
