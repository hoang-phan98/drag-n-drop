import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { ItemType } from "../models/ItemType";
import { Item, ItemProps } from "./Item";

export type DraggableItemProps = {
    item: ItemProps,
    setIsDragging: (isDragging: boolean) => void,
};

export type DragSourceItem = {
    id: string,
    type: ItemType
};

export const DraggableItem = ({ item, setIsDragging }: DraggableItemProps) => {
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: item.type,
        item: { id: item.id, type: item.type } as DragSourceItem,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    useEffect(() => {
        setIsDragging(isDragging);
    }, [isDragging]);

    return isDragging 
        ? <div ref={dragPreview} /> 
        : <div ref={drag}> <Item {...item}/> </div>
};