import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { DraggableItem } from "./DraggableItem";
import { DroppableContainerA } from "./DroppableContainerA";
import { DroppableContainerB } from "./DroppableContainerB";
import { DroppableZone } from "./DroppableZone";
import { ItemType } from "./models/ItemType";

import "./Playground.css";
import { RemovableItem } from "./RemovableItem";

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  ordinal: number;
}

export interface Zone {
  id: string;
  types: ItemType[];
  items: Item[];
}

export const Playground = () => {
  const [activeItem, setActiveItem] = useState<Item | null>(null);

  const [items, updateItems] = useState<Item[]>([
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
      items: [],
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
          { id: "droppable-product-zone", types: [ItemType.Leaf], items: [] },
        ]);
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over) {
      // Adding item into the dropzone items list
      const foundZone = droppableZones.find((dZone) => dZone.id === over.id);
      if (foundZone) {
        const newDroppableZones = droppableZones.filter(
          (dZone) => dZone.id === over.id
        );

        const newDroppedZone = {
          ...foundZone,
          items: [...foundZone.items, active.data.current as Item],
        };
        updateDroppableZones([...newDroppableZones, newDroppedZone]);

        // Removing item from items list
        const newDraggableItemsList = items.filter(
          (dItem) => dItem.id !== active.id
        );
        updateItems([...newDraggableItemsList]);

        // Update activeItem to nothing
        setActiveItem(null);
      }
    }
  }

  return (
    <div className="playground">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <DroppableContainerA>
          <ul className="items-list">
            {items.map((item, itemIndex) => {
              return (
                <li key={itemIndex} className="item">
                  <DraggableItem item={item} />
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
