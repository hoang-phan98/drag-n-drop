import { Item, ItemProps } from "./Item";
import { RemoveIcon } from "./RemoveIcon";
import "./RemovableItem.css";
import { DraggableItem, DragSourceItem } from "./DraggableItem";
export interface RemovableItemProps {
  item: ItemProps;
  onRemove: (item: ItemProps) => void;
  setDraggingItem: (draggingItem?: ItemProps) => void;
  useDragDependencies: ItemProps[];
}

export const RemovableItem = ({ item, onRemove, setDraggingItem, useDragDependencies }: RemovableItemProps) => {
  return (
    <div className="removable-item">
      <DraggableItem setDraggingItem={setDraggingItem} item={item} useDragDependencies={useDragDependencies}/>
      <button className="removable-item-btn" onClick={() => onRemove(item)}>
        <RemoveIcon />
      </button>
    </div>
  );
};
