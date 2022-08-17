import { useDrag } from "react-dnd";
import { Item, ItemProps } from "./Item";

export type DraggableItemProps = {
    item: ItemProps,
};

export const DraggableItem = ({ item }: DraggableItemProps) => {
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: item.type,
        item: item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => ({}),
    }));

    return isDragging 
        ? <div ref={dragPreview} /> 
        : <div ref={drag}> <Item {...item}/> </div>
};