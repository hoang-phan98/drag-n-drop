import { useDrop } from "react-dnd";
import { ItemProps } from "../items/Item";
import { ZoneProps } from "../models/ZoneProps";
import classNames from "classnames";
import "./DroppableZone.css";
import { DragSourceItem } from "../items/DraggableItem";
import { RemovableItem } from "../items/RemovableItem";

export interface DroppableZoneProps {
    zone: ZoneProps;
    onRemove: (zone: ZoneProps) => void;
    onDrop: (item: DragSourceItem, zone: ZoneProps) => void;
    draggingItem?: ItemProps;
    setDraggingItem: (draggingItem?: ItemProps) => void;
    dependencies: [ItemProps[], ZoneProps[]];
    useDragDependencies: ItemProps[];
    style?: React.CSSProperties;
}

export const DroppableZone = ({
    zone, 
    onRemove,
    onDrop,
    draggingItem,
    setDraggingItem,
    dependencies,
    useDragDependencies,
    style
}: DroppableZoneProps) => {
    const [{ isOver, canDrop }, drop] =  useDrop(() => ({
        accept: zone.accepts,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item: DragSourceItem) => {
            return zone.accepts.includes(item.type) 
                && zone.item == undefined
                && (zone.ordinal == undefined || item.ordinal < zone.ordinal);
        },
        drop: (item: DragSourceItem) => {
            onDrop(item, zone);
        },
    }), dependencies);

    return (
        <div className={classNames(
            "droppable-zone",
            draggingItem && canDrop && "valid",
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
                    useDragDependencies={useDragDependencies}
                    setDraggingItem={setDraggingItem} 
                    onRemove={() => onRemove(zone)} 
                    item={zone.item}
                />
            }
        </div>
    );
};