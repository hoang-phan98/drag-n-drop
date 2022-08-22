import { useDraggable } from "@dnd-kit/core";
import { Item, ItemProps } from "./Item";

export interface DraggableItemProps {
  item: ItemProps;
}

export const DraggableItem = ({ item }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: {
      ...item,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Item {...item} />
    </div>
  );
};
