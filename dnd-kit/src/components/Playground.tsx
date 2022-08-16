import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useCallback, useState } from "react";
import { DraggableItem } from "./DraggableItem";
import { DroppableContainerA } from "./DroppableContainerA";
import { DroppableContainerB } from "./DroppableContainerB";
import { DroppableZone } from "./DroppableZone";
import { ItemType } from "./models/ItemType";

import "./Playground.css";

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  ordinal: number;
}

export interface Zone {
  id: string;
  types: ItemType[];
}

export const Playground = () => {
  const [activeItem, setActiveItem] = useState<Item | null>(null);

  const [draggableItems, updateDraggableItems] = useState<Item[]>([
    {
      id: "draggable-product-item",
      name: "Product",
      type: ItemType.Leaf,
      ordinal: 100,
    },
  ]);

  const [droppableZones, updateDroppableZones] = useState<Zone[]>([
    {
      id: "droppable-segment-zone",
      types: [ItemType.Hierarchy],
    },
  ]);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveItem(active.data.current as Item);

    if (active.data.current && active.data.current.type === ItemType.Leaf) {
      const isFound = droppableZones.filter(
        (dZone) => dZone.id === "droppable-product-zone"
      );

      if (isFound.length === 0) {
        updateDroppableZones([
          ...droppableZones,
          { id: "droppable-product-zone", types: [ItemType.Leaf] },
        ]);
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveItem(null);
  }

  return (
    <div className="playground">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <DroppableContainerA>
          <ul className="items-list">
            {draggableItems.map((dItem, dItemIndex) => {
              return (
                <li key={dItemIndex} className="item">
                  <DraggableItem item={dItem} />
                </li>
              );
            })}
          </ul>
        </DroppableContainerA>
        <DroppableContainerB>
          {droppableZones.map((dZone, dZoneIndex) => {
            const canDrop = activeItem
              ? dZone.types.includes(activeItem.type)
              : false;

            return (
              <DroppableZone
                key={dZoneIndex}
                zone={dZone}
                types={dZone.types}
                validDropLocation={canDrop}
              />
            );
          })}
        </DroppableContainerB>
      </DndContext>
    </div>
  );
};
