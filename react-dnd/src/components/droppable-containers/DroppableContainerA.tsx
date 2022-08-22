import { ReactNode } from "react";
import "./DroppableContainer.css";

export interface DroppableContainerProps {
  children?: ReactNode;
};

export const DroppableContainerA = ({ children }: DroppableContainerProps) => {
  return (
    <div className="droppable-a-container" >
      {children}
    </div>
  );
};