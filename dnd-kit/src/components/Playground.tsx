import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { DroppableContainerA } from "./DroppableContainerA";
import { DroppableContainerB } from "./DroppableContainerB";
import { DroppableZone } from "./DroppableZone";
import { ItemProps } from "./Item";
import { ItemList } from "./ItemList";
import { ItemType } from "./models/ItemType";
import { v4 as uuidv4 } from "uuid";

import "./Playground.css";
export interface Zone {
  id: string;
  accepts: ItemType[];
  item?: ItemProps;
}

export const Playground = () => {
  const [activeItem, setActiveItem] = useState<ItemProps | null>(null);

  const [items, updateItems] = useState<ItemProps[]>([
    {
      id: uuidv4(),
      name: "Segment",
      type: ItemType.Hierarchy,
      ordinal: 90,
    },
    {
      id: uuidv4(),
      name: "Product",
      type: ItemType.Leaf,
      ordinal: 100,
    },
    {
      id: uuidv4(),
      name: "Brand",
      type: ItemType.Attribute,
      ordinal: -1,
    },
    {
      id: uuidv4(),
      name: "Variant",
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
        // Dropping attribute items we should add a new droppable zone below to each dropzone in the list
        const newDroppableZones: Zone[] = [];
        droppableZones.forEach((dZone) => {
          newDroppableZones.push(dZone);
          newDroppableZones.push({
            id: uuidv4(),
            accepts: [_activeItem.type],
            item: undefined,
          });
        });

        updateDroppableZones([...newDroppableZones]);
      } else {
        // Assuming we're dropping Hierarchy/Root/Leaf nodes
        const isFound = droppableZones.filter((dZone) =>
          dZone.accepts.includes(_activeItem.type)
        );

        // When no matching zones were found add one
        // TODO probably should take into account where we want to inject the new zone based on ordinal
        if (isFound.length === 0) {
          updateDroppableZones([
            ...droppableZones,
            {
              id: `droppable-${_activeItem.name.toLowerCase()}-zone`,
              accepts: [_activeItem.type],
              item: undefined,
            },
          ]);
        } else {
          updateDroppableZones([
            {
              id: `droppable-${_activeItem.name.toLowerCase()}-zone`,
              accepts: [_activeItem.type],
              item: undefined,
            },
          ]);
        }
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;
    const canDrop =
      activeItem &&
      over &&
      over.data.current &&
      over.data.current.accepts.includes(activeItem.type) &&
      !over.data.current.item;

    if (canDrop) {
      // Adding item into the dropzone items list
      const foundZone = droppableZones.find((dZone) => dZone.id === over.id);
      const foundZoneIndex = droppableZones.findIndex(
        (dZone) => dZone.id === over.id
      );

      if (foundZone) {
        const newDroppedZone = {
          ...foundZone,
          item: activeItem,
        };

        const newDroppableZones = droppableZones
          .filter((dZone) => dZone.id !== over.id)
          .filter((dZone) => dZone.item);

        newDroppableZones.splice(foundZoneIndex, 0, newDroppedZone);

        updateDroppableZones([...newDroppableZones]);

        // Removing item from items list
        const newDraggableItemsList = items.filter(
          (dItem) => dItem.id !== activeItem.id
        );
        updateItems([...newDraggableItemsList]);

        // Update activeItem to nothing
        setActiveItem(null);
      }
    } else {
      // This is where we are assuming item did not get dropped over the dropzones
      setActiveItem(null);
      // Filter out all empty zones
      const newDroppableZones = droppableZones.filter((dZone) => dZone.item);
      updateDroppableZones(newDroppableZones);
    }
  }

  function handleRemove(item: ItemProps, zone: Zone) {
    // Loop through Dropzones and remove child from dropzone, if last child and not last dropzone, remove whole dropzone?
    const foundZone = droppableZones.find((dZone) => dZone.id === zone.id);

    if (foundZone) {
      const newZones = droppableZones
        .filter((dZone) => dZone.id !== zone.id)
        .filter((dZone) => dZone.item);

      updateDroppableZones([...newZones]);
      updateItems([...items, item]);
    }
  }

  // NOTE: have tried using onDragMove, onDragOver and onDragCancel which didn't seemed to be useful
  return (
    <div className="playground">
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <DroppableContainerA>
          <ItemList
            heading={"Hierarchies"}
            items={items.filter(
              (item) => !item.type.includes(ItemType.Attribute)
            )}
          />
          <ItemList
            heading={"Attributes"}
            items={items.filter((item) =>
              item.type.includes(ItemType.Attribute)
            )}
          />
        </DroppableContainerA>
        <DroppableContainerB>
          {droppableZones.map((dZone, dZoneIndex) => {
            const canDrop =
              activeItem && activeItem.type
                ? dZone.accepts.includes(activeItem.type) && !dZone.item
                : false;

            const style = {
              marginLeft: `${dZoneIndex * 1.5}rem`,
            } as React.CSSProperties;

            return (
              <DroppableZone
                key={dZoneIndex}
                zone={dZone}
                validDropLocation={canDrop}
                onRemove={handleRemove}
                style={style}
              />
            );
          })}
        </DroppableContainerB>
      </DndContext>
    </div>
  );
};
