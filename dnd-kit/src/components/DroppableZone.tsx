import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Item, Zone } from "./Playground";
import classNames from "classnames";

import "./DroppableZone.css";
import { ItemType } from "./models/ItemType";
import { RemovableItem } from "./RemovableItem";
export interface DroppableZoneProps {
  zone: Zone;
  types: ItemType[];
  validDropLocation: boolean;
  children?: ReactNode;
}

export const DroppableZone = ({
  zone,
  types,
  validDropLocation,
  children,
}: DroppableZoneProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: zone.id,
    data: {
      accepts: types,
    },
  });

  return (
    <div
      className={classNames(
        "droppable-zone",
        `${zone.id}`,
        validDropLocation && "valid",
        isOver && validDropLocation && "is-over"
      )}
      ref={setNodeRef}
    >
      {zone.items.map((item, itemIndex) => {
        return (
          <RemovableItem
            key={itemIndex}
            item={item}
            onRemove={(item: Item) => {
              console.log("Remove something", item.name);
            }}
          />
        );
      })}
    </div>
  );
};
