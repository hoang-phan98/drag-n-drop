import { useDrop } from "react-dnd";
import { ItemProps } from "../items/Item";
import { ZoneProps } from "../models/ZoneProps";
import classNames from "classnames";
import "./DroppableZone.css";
import { DraggableItem, DragSourceItem } from "../items/DraggableItem";
import { RemovableItem } from "../items/RemovableItem";
import { ItemType } from "../models/ItemType";

export interface DroppableZoneProps {
    zone: ZoneProps;
    onRemove: (zone: ZoneProps) => void;
    onDrop: (item: DragSourceItem, zone: ZoneProps) => void;
    isDragging: boolean;
    setIsDragging: (isDragging: boolean) => void;
    style?: React.CSSProperties;
}

export const DroppableZone = ({
    zone, 
    onRemove,
    onDrop,
    isDragging,
    setIsDragging,
    style
}: DroppableZoneProps) => {
    const [{ isOver, canDrop }, drop] =  useDrop(() => ({
        accept: zone.accepts,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item: DragSourceItem) => {
            return zone.accepts.includes(item.type) && zone.item == null;
        },
        drop: (item: DragSourceItem) => {
            console.log(item, zone);
            onDrop(item, zone);
        },
    }));

    return (
        <div className={classNames(
            "droppable-zone",
            isDragging && canDrop && "valid",
            `${zone.id}`,
            isOver && canDrop && "is-over",
            { "with-children": zone.item != null }
          )} 
          ref={drop} 
          style={{
            ...style
          } as React.CSSProperties}
        >
            {zone.item && 
                <RemovableItem 
                    setIsDragging={setIsDragging} 
                    onRemove={() => onRemove(zone)} 
                    item={zone.item}
                />
            }
        </div>
    );
};