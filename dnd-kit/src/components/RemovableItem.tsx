import { Item, ItemProps } from "./Item";
import { RemoveIcon } from "./RemoveIcon";

import "./RemovableItem.css";
export interface RemovableItemProps {
  item: ItemProps;
  onRemove: (item: ItemProps) => void;
}

export const RemovableItem = ({ item, onRemove }: RemovableItemProps) => {
  return (
    <div className="removable-item">
      <Item {...item} />
      <button className="removable-item-btn" onClick={() => onRemove(item)}>
        <RemoveIcon />
      </button>
    </div>
  );
};
