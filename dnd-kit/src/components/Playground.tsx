import { DndContext, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
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
}

export const Playground = () => {
  const [draggableItems, updateDraggableItems] = useState<Item[]>([
    {
      id: "draggable-product-item",
      name: "Product",
      type: ItemType.Hierarchy,
      ordinal: 100,
    },
  ]);

  const [droppableZones, updateDroppableZones] = useState<Zone[]>([]);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    if (
      active.data.current &&
      active.data.current.type === ItemType.Hierarchy
    ) {
      console.log({ event });
      updateDroppableZones([
        ...droppableZones,
        { id: "droppable-product-zone" },
      ]);
    }
  }

  return (
    <div className="playground">
      <DndContext onDragStart={handleDragStart}>
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
            return <DroppableZone key={dZoneIndex} zone={dZone} />;
          })}
        </DroppableContainerB>
      </DndContext>
    </div>
  );
};
