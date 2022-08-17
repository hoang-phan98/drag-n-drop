import { useDrop } from "react-dnd";
import { ItemType } from "../models/ItemType";
import "./DroppableContainer.css";
import { DroppableContainerProps } from "./DroppableContainerA";

export const DroppableContainerB = ({ children }: DroppableContainerProps) => {
    const [{ isOver }, drop] =  useDrop(() => ({
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
      <div className="droppable-b-container" ref={drop} style={{ backgroundColor: isOver ? "lightyellow" : "white" }}>
        {children}
      </div>
    );
};