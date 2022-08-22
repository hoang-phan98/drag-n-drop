import { DraggableItem, DragSourceItem } from "./DraggableItem";
import { ItemProps } from "./Item";
import "./ItemList.css";

export interface ItemListProps {
  heading: string;
  items: ItemProps[];
  setDraggingItem: (draggingItem?: ItemProps) => void;
  useDragDependencies: ItemProps[]
}

export const ItemList = ({ heading, items, setDraggingItem, useDragDependencies }: ItemListProps) => {
  return (
    <div>
      <h2 className="subheading">{heading}</h2>
      <ul className="items">
        {items.map((item, itemIndex) => {
          return (
            <li key={itemIndex}>
              <DraggableItem setDraggingItem={setDraggingItem} item={item} useDragDependencies={useDragDependencies}/>
            </li>
          );
        })}
      </ul>
    </div>
  );
};