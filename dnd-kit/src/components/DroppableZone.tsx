import { useDroppable } from "@dnd-kit/core";
import { Zone } from "./Playground";
import classNames from "classnames";

import "./DroppableZone.css";
import { RemovableItem } from "./RemovableItem";
import { ItemProps } from "./Item";
import React from "react";
import { NewEntryIcon } from "./NewEntryIcon";
export interface DroppableZoneProps {
  zone: Zone;
  validDropLocation: boolean;
  onRemove: (item: ItemProps, zone: Zone) => void;
  newEntry?: boolean;
  style?: React.CSSProperties;
}

export const DroppableZone = ({
  zone,
  validDropLocation,
  onRemove,
  newEntry,
  style,
}: DroppableZoneProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: zone.id,
    data: {
      ...zone,
    },
  });

  return (
    <div
      className={classNames(
        "droppable-zone",
        `${zone.id}`,
        validDropLocation && "valid",
        isOver && validDropLocation && "is-over",
        { "has-item": zone.item }
      )}
      style={
        {
          ...style,
        } as React.CSSProperties
      }
      ref={setNodeRef}
    >
      {zone.item && (
        <>
          {newEntry && <NewEntryIcon />}
          <RemovableItem
            item={zone.item}
            onRemove={(item) => {
              onRemove(item, zone);
            }}
          />
        </>
      )}
    </div>
  );
};
