import { ItemProps } from "../items/Item";
import { ItemType } from "./ItemType";

export type ZoneProps = {
    accepts: ItemType[],
    id: string,
    ordinal?: number,
    item?: ItemProps
};