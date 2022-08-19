import { DraggableItem } from "./DraggableItem";
import { ItemProps } from "./Item";
import "./ItemList.css";

export interface ItemListProps {
  heading: string;
  items: ItemProps[];
  setIsDragging: (isDragging: boolean) => void;
}

export const ItemList = ({ heading, items, setIsDragging }: ItemListProps) => {
  console.log(items);
  return (
    <div>
      <h2 className="subheading">{heading}</h2>
      <ul className="items">
        {items.map((item, itemIndex) => {
          return (
            <li key={itemIndex}>
              <DraggableItem setIsDragging={setIsDragging} item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};