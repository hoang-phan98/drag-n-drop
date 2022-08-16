import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { DraggableItem } from "./DraggableItem";
import { DroppableContainerA } from "./DroppableContainerA";
import { DroppableContainerB } from "./DroppableContainerB";
import { DroppableZone } from "./DroppableZone";
import { ItemProps } from "./Item";
import { ItemType } from "./models/ItemType";

import "./Playground.css";
import { RemovableItem } from "./RemovableItem";
export interface Zone {
  id: string;
  types: ItemType[];
  items: ItemProps[];
}

export const Playground = () => {
  const [activeItem, setActiveItem] = useState<ItemProps | null>(null);

  const [items, updateItems] = useState<ItemProps[]>([
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
    setActiveItem(active.data.current as ItemProps);

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
          items: [...foundZone.items, active.data.current as ItemProps],
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

  function handleRemove(item: ItemProps, zone: Zone) {
    // Loop through Dropzones and remove child from dropzone, if last child and not last dropzone, remove whole dropzone?
    const foundZone = droppableZones.find((dZone) => dZone.id === zone.id);

    if (foundZone) {
      // Removed child from zone
      const newItems = foundZone.items.filter(
        (foundZoneItem) => foundZoneItem.id !== item.id
      );

      const newZone = {
        ...foundZone,
        items: [...newItems],
      };

      const newZones = droppableZones.filter((dZone) => dZone.id !== zone.id);
      updateDroppableZones([...newZones, newZone]);

      updateItems([...items, item]);
    }
  }

  return (
    <div className="playground">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <DroppableContainerA>
          <ul className="items-list">
            {items.map((item, itemIndex) => {
              return (
                <li key={itemIndex}>
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
                onRemove={handleRemove}
              />
            );
          })}
        </DroppableContainerB>
      </DndContext>
    </div>
  );
};
