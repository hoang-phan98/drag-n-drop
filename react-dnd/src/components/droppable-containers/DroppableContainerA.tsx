import { ReactNode } from "react";
import { useDrop } from "react-dnd";
import { ItemType } from "../models/ItemType";
import "./DroppableContainer.css";

export interface DroppableContainerProps {
  children?: ReactNode;
};

export const DroppableContainerA = ({ children }: DroppableContainerProps) => {
    const [{ isOver, canDrop }, drop] =  useDrop(() => ({
        accept: [ItemType.Attribute, ItemType.Hierarchy, ItemType.Leaf],
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item, monitor) => {
            return true;   
        },
    }));
  
    return (
      <div className="droppable-a-container" ref={drop} style={{ backgroundColor: isOver ? "lightblue" : "white" }}>
        {children}
      </div>
    );
};