import { DraggableItem, DragSourceItem } from "./DraggableItem";
import { ItemProps } from "./Item";
import "./ItemList.css";

export interface ItemListProps {
  heading: string;
  items: ItemProps[];
  setDraggingItem: (draggingItem?: ItemProps) => void;
  useDragDependencies: [ItemProps[]],
  handleDragEnd: () => void;
}

export const ItemList = ({ heading, items, setDraggingItem, useDragDependencies, handleDragEnd }: ItemListProps) => {
  return (
    <div>
      <h2 className="subheading">{heading}</h2>
      <ul className="items">
        {items.map((item, itemIndex) => {
          return (
            <li key={itemIndex}>
              <DraggableItem
                setDraggingItem={setDraggingItem}
                item={item}
                useDragDependencies={useDragDependencies}
                handleDragEnd={handleDragEnd}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};