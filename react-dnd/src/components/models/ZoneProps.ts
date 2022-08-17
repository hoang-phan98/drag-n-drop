import { ItemProps } from "../items/Item";
import { ItemType } from "./ItemType";

export type ZoneProps = {
    accepts: ItemType[],
    id: string,
    item: ItemProps[]
};