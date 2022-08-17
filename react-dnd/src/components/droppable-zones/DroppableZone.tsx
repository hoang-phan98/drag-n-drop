import { useDrop } from "react-dnd";
import { ItemProps } from "../items/Item";
import { ItemType } from "../models/ItemType";
import { ZoneProps } from "../models/ZoneProps";

export interface DroppableZoneProps {
    zone: ZoneProps;
    validDropLocation: boolean;
    onRemove: (item: ItemProps, zone: ZoneProps) => void;
    style?: React.CSSProperties;
}

export const DroppableZone = ({}: DroppableZoneProps) => {
    const [{ isOver, canDrop }, drop] =  useDrop(() => ({
        accept: [ItemType.Attribute, ItemType.Hierarchy, ItemType.Leaf],
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item, monitor) => {
            return true;   
        },
        drop: (item) => {},
    }));

    return (
        <div>
        </div>
      );
};