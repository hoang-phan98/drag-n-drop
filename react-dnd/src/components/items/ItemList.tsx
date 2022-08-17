import { DraggableItem } from "./DraggableItem";
import { ItemProps } from "./Item";
import "./ItemList.css";

export interface ItemListProps {
  heading: string;
  items: ItemProps[];
}

export const ItemList = ({ heading, items }: ItemListProps) => {
  return (
    <div>
      <h2 className="subheading">{heading}</h2>
      <ul className="items">
        {items.map((item, itemIndex) => {
          return (
            <li key={itemIndex}>
              <DraggableItem item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};