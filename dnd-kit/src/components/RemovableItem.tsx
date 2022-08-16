import { Item } from "./Playground";

export interface RemovableItemProps {
  item: Item;
  onRemove: (item: Item) => void;
}

export const RemovableItem = ({ item, onRemove }: RemovableItemProps) => {
  return (
    <div>
      <span>{item.name}</span>
      <button onClick={() => onRemove(item)}>Remove</button>
    </div>
  );
};
