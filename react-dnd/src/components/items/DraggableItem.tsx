import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { ItemType } from "../models/ItemType";
import { Item, ItemProps } from "./Item";

export type DraggableItemProps = {
    item: ItemProps,
    setDraggingItem: (draggingItem?: ItemProps) => void,
    useDragDependencies: ItemProps[]
};

export type DragSourceItem = {
    id: string,
    type: ItemType,
    ordinal: number
};

export const DraggableItem = ({ item, setDraggingItem, useDragDependencies }: DraggableItemProps) => {
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: item.type,
        item: { id: item.id, type: item.type, ordinal: item.ordinal } as DragSourceItem,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [useDragDependencies]);

    useEffect(() => {
        isDragging && console.log(`Dragging item: ${item.name}`);
        !isDragging && console.log(`Stopped dragging item: ${item.name}`);
        setDraggingItem(item);
    }, [isDragging]);

    return isDragging 
        ? <div ref={dragPreview} /> 
        : <div ref={drag}> <Item {...item}/> </div>
};