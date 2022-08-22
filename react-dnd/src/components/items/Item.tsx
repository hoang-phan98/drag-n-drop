import { ItemType } from "../models/ItemType";
import "./Item.css";
import { DragIcon } from "./DragIcon";

export interface ItemProps {
  id: string;
  name: string;
  type: ItemType;
  ordinal: number;
}

export const Item = ({ name, type }: ItemProps) => {
  return (
    <div className="item" style={{backgroundColor: type === ItemType.Attribute  ? "lightyellow" : "none"}}>
      <span>{name}</span>
      <DragIcon />
    </div>
  );
};
