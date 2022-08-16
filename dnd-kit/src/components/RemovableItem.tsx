import { Item, ItemProps } from "./Item";

export interface RemovableItemProps {
  item: ItemProps;
  onRemove: (item: ItemProps) => void;
}

export const RemovableItem = ({ item, onRemove }: RemovableItemProps) => {
  return (
    <div className="removable-item">
      <Item {...item} />
      <button onClick={() => onRemove(item)}>Remove</button>
    </div>
  );
};
