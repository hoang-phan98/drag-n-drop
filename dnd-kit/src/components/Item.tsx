import { ItemType } from "./models/ItemType";
import "./Item.css";

export interface ItemProps {
  id: string;
  name: string;
  type: ItemType;
  ordinal: number;
}

export const Item = ({ name }: ItemProps) => {
  return (
    <div className="item">
      <span>{name}</span>
    </div>
  );
};
