import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { ItemType } from "../models/ItemType";
import { Item, ItemProps } from "./Item";

export type DraggableItemProps = {
    item: ItemProps,
    setDraggingItem: (draggingItem?: ItemProps) => void,
    useDragDependencies: [ItemProps[]],
    handleDragEnd: () => void;
    canDrag?: boolean,
};

export type DragSourceItem = {
    id: string,
    type: ItemType,
    ordinal: number
};

export const DraggableItem = ({ item, setDraggingItem, useDragDependencies, handleDragEnd, canDrag = true }: DraggableItemProps) => {
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: item.type,
        item: { id: item.id, type: item.type, ordinal: item.ordinal } as DragSourceItem,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            // If didDrop, action will be handled by drop monitor
            if (monitor.didDrop()) {
                return;
            };
            handleDragEnd()
        },
        canDrag: canDrag,
    }), useDragDependencies);

    useEffect(() => {
        if (isDragging) {
            console.log(`Started dragging item: ${item.name}`)
            setDraggingItem(item);
        } else {
            console.log(`Stopped dragging item: ${item.name}`)
            setDraggingItem(undefined);
        }
    }, [isDragging]);

    return isDragging
        ? <div ref={dragPreview} />
        : <div ref={drag}> <Item {...item} /> </div>
};