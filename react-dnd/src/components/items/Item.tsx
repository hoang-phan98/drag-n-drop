import { ItemType } from "../models/ItemType";
import "./Item.css";
import { DragIcon } from "./DragIcon";

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
      <DragIcon />
    </div>
  );
};
