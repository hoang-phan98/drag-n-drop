import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Zone } from "./Playground";
import classNames from "classnames";

import "./DroppableZone.css";
import { ItemType } from "./models/ItemType";
import { RemovableItem } from "./RemovableItem";
import { ItemProps } from "./Item";
export interface DroppableZoneProps {
  zone: Zone;
  types: ItemType[];
  validDropLocation: boolean;
  onRemove: (item: ItemProps, zone: Zone) => void;
}

export const DroppableZone = ({
  zone,
  types,
  validDropLocation,
  onRemove,
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
            onRemove={(item) => {
              onRemove(item, zone);
            }}
          />
        );
      })}
    </div>
  );
};
