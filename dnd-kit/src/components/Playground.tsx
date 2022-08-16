import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { DraggableItem } from "./DraggableItem";
import { DroppableContainerA } from "./DroppableContainerA";
import { DroppableContainerB } from "./DroppableContainerB";
import { DroppableZone } from "./DroppableZone";
import { ItemProps } from "./Item";
import { ItemType } from "./models/ItemType";

import "./Playground.css";
export interface Zone {
  id: string;
  types: ItemType[];
  items: ItemProps[];
}

export const Playground = () => {
  const [activeItem, setActiveItem] = useState<ItemProps | null>(null);

  const [items, updateItems] = useState<ItemProps[]>([
    {
      id: "draggable-segment-item",
      name: "Segment",
      type: ItemType.Hierarchy,
      ordinal: 90,
    },
    {
      id: "draggable-product-item",
      name: "Product",
      type: ItemType.Leaf,
      ordinal: 100,
    },
    {
      id: "draggable-brand-item",
      name: "Brand",
      type: ItemType.Attribute,
      ordinal: -1,
    },
  ]);

  const [droppableZones, updateDroppableZones] = useState<Zone[]>([]);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    if (active && active.data && active.data.current) {
      const _activeItem = active.data.current as ItemProps;
      setActiveItem(_activeItem);

      if (_activeItem.type === ItemType.Attribute) {
      } else {
        // Assuming we're dropping Hierarchy/Root/Leaf nodes
        const isFound = droppableZones.filter((dZone) =>
          dZone.types.includes(_activeItem.type)
        );

        // When no matching zones were found add one
        // TODO probably should take into account where we want to inject the new zone based on ordinal
        if (isFound.length === 0) {
          updateDroppableZones([
            ...droppableZones,
            {
              id: `droppable-${_activeItem.name.toLowerCase()}-zone`,
              types: [_activeItem.type],
              items: [],
            },
          ]);
        } else {
          updateDroppableZones([
            {
              id: `droppable-${_activeItem.name.toLowerCase()}-zone`,
              types: [_activeItem.type],
              items: [],
            },
          ]);
        }
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;
    if (
      activeItem &&
      over &&
      over.data.current &&
      over.data.current.accepts.includes(activeItem.type)
    ) {
      // Adding item into the dropzone items list
      const foundZone = droppableZones.find((dZone) => dZone.id === over.id);

      if (foundZone) {
        const canDrop = foundZone.types.includes(activeItem.type);

        if (canDrop) {
          const newDroppableZones = droppableZones.filter(
            (dZone) => dZone.id !== over.id
          );

          const newDroppedZone = {
            ...foundZone,
            items: [...foundZone.items, activeItem],
          };
          updateDroppableZones([...newDroppableZones, newDroppedZone]);

          // Removing item from items list
          const newDraggableItemsList = items.filter(
            (dItem) => dItem.id !== activeItem.id
          );
          updateItems([...newDraggableItemsList]);

          // Update activeItem to nothing
          setActiveItem(null);
        }
      }
    } else {
      // This is where we are assuming item did not get dropped over the dropzones
      setActiveItem(null);
      // Filter out all empty zones
      const newDroppableZones = droppableZones.filter(
        (dZone) => dZone.items.length !== 0
      );
      updateDroppableZones(newDroppableZones);
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

      if (newItems.length === 0) {
        //empty children, then remove parent
        const newZones = droppableZones.filter((dZone) => dZone.id !== zone.id);
        updateDroppableZones([...newZones]);
      } else {
        const newZone = {
          ...foundZone,
          items: [...newItems],
        };
        const newZones = droppableZones.filter((dZone) => dZone.id !== zone.id);
        updateDroppableZones([...newZones, newZone]);
      }

      updateItems([...items, item]);
    }
  }

  // NOTE: have tried using onDragMove, onDragOver and onDragCancel which didn't seemed to be useful
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
            const canDrop =
              activeItem && activeItem.type
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
