import { useDraggable } from "@dnd-kit/core";
import { Item } from "./Playground";

export interface DraggableItemProps {
  item: Item;
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
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {item.name}
    </button>
  );
};
