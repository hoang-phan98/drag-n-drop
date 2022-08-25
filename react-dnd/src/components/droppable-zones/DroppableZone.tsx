import { useDrop } from "react-dnd";
import { ItemProps } from "../items/Item";
import { ZoneProps } from "../models/ZoneProps";
import classNames from "classnames";
import "./DroppableZone.css";
import { DragSourceItem } from "../items/DraggableItem";
import { RemovableItem } from "../items/RemovableItem";
import { NewEntryIcon } from "./NewEntryIcon";

export interface DroppableZoneProps {
    newEntry: boolean;
    zone: ZoneProps;
    onRemove: (zone: ZoneProps) => void;
    onDrop: (item: DragSourceItem, zone: ZoneProps) => void;
    draggingItem?: ItemProps;
    setDraggingItem: (draggingItem?: ItemProps) => void;
    useDropDependencies: [ItemProps[], ZoneProps[]];
    useDragDependencies: [ItemProps[]];
    handleDragEnd: () => void;
    style?: React.CSSProperties;
}

export const DroppableZone = ({
    newEntry,
    zone,
    onRemove,
    onDrop,
    setDraggingItem,
    useDropDependencies,
    useDragDependencies,
    handleDragEnd,
    style
}: DroppableZoneProps) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: zone.accepts,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item: DragSourceItem) => {
            return zone.accepts.includes(item.type)
                && zone.item === undefined
                && (zone.ordinal === undefined || item.ordinal <= zone.ordinal);
        },
        drop: (item: DragSourceItem) => {
            onDrop(item, zone);
        },
    }), useDropDependencies);

    return (
        <div className={classNames(
            "droppable-zone",
            canDrop && "valid",
            `${zone.id}`,
            isOver && canDrop && "is-over",
            { "with-children": zone.item != null }
        )}
            ref={drop}
            style={{
                ...style
            } as React.CSSProperties}
        >
            {newEntry && zone.item && <NewEntryIcon />}
            {zone.item &&
                <RemovableItem
                    useDragDependencies={useDragDependencies}
                    setDraggingItem={setDraggingItem}
                    onRemove={() => onRemove(zone)}
                    item={zone.item}
                    handleDragEnd={handleDragEnd}
                />
            }
        </div>
    );
};