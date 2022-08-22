import { ItemProps } from "../items/Item";
import { ItemType } from "./ItemType";

export type ZoneProps = {
    accepts: ItemType[],
    id: string,
    isTemporary?: boolean,
    ordinal?: number,
    item?: ItemProps
};