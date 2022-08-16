import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Zone } from "./Playground";
import classNames from "classnames";

import "./DroppableZone.css";
import { ItemType } from "./models/ItemType";
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
      {children}
    </div>
  );
};
