import "./DroppableContainer.css";
import { DroppableContainerProps } from "./DroppableContainerA";

export const DroppableContainerB = ({ children }: DroppableContainerProps) => {  
    return (
      <div className="droppable-b-container">
        {children}
      </div>
    );
};