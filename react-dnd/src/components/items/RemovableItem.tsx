import { Item, ItemProps } from "./Item";
import { RemoveIcon } from "./RemoveIcon";
import "./RemovableItem.css";
import { DraggableItem } from "./DraggableItem";
export interface RemovableItemProps {
  item: ItemProps;
  onRemove: (item: ItemProps) => void;
  setIsDragging: (isDragging: boolean) => void;
}

export const RemovableItem = ({ item, onRemove, setIsDragging }: RemovableItemProps) => {
  return (
    <div className="removable-item">
      <DraggableItem setIsDragging={setIsDragging} item={item} />
      <button className="removable-item-btn" onClick={() => onRemove(item)}>
        <RemoveIcon />
      </button>
    </div>
  );
};
