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
      name: "SubCategory",
      type: ItemType.Hierarchy,
      ordinal: 80,
    },
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
          });
        });

        updateDroppableZones([...newDroppableZones]);
        return;
      } else {
        // When no droppable zones exist yet
        if (droppableZones.length === 0) {
          updateDroppableZones([
            {
              id: _activeItem.id,
              accepts: [_activeItem.type],
            },
          ]);
          return;
        }

        // Assuming we're dropping Hierarchy/Root/Leaf nodes
        const isFound = droppableZones.filter(
          (dZone) => dZone.id === _activeItem.id
        );

        // When no matching zones were found add one
        if (isFound.length === 0) {
          const index = droppableZones.findIndex(
            (dZone) => dZone.item && dZone.item.ordinal > _activeItem.ordinal
          );

          // Case where no ordinal is greater, then we should loop through all existing droppable zones and add an area
          if (index < 0) {
            // Find last index of HierarchyItem and start looping and adding droppable zones from there
            // NOTE: array.findLast doesn't work here???
            let reversedDroppableZones = droppableZones.map((d) => d);
            reversedDroppableZones.reverse();
            const lastHierarchyIndex = reversedDroppableZones.findIndex(
              (dZone) =>
                dZone.item &&
                dZone.item.type === ItemType.Hierarchy &&
                dZone.item.ordinal < _activeItem.ordinal
            );

            if (lastHierarchyIndex < 0) {
              // Assume non was found, appending to end of list
              updateDroppableZones([
                ...droppableZones,
                {
                  id: _activeItem.id,
                  accepts: [_activeItem.type],
                },
              ]);
              return;
            }

            // Need to subtrack position from the reversed index from droppableZones length - 1
            const injectionIndex =
              droppableZones.length - lastHierarchyIndex - 1;

            const newDroppableZones: Zone[] = [];
            droppableZones.forEach((dZone, dZoneIndex) => {
              newDroppableZones.push(dZone);

              if (dZoneIndex >= injectionIndex) {
                newDroppableZones.push({
                  id: uuidv4(),
                  accepts: [_activeItem.type],
                });
              }
            });
            
            updateDroppableZones([...newDroppableZones]);
            return;
          }

          // Case where there are ordinal greater than draggable item
          const newDroppableZones = droppableZones.map(d => d);
          newDroppableZones.splice(index, 0, {
            id: _activeItem.id,
            accepts: [_activeItem.type],
          });

          updateDroppableZones([...newDroppableZones]);
          return;
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
      // Adding item into the dropzone
      const foundZone = droppableZones.find((dZone) => dZone.id === over.id);
      const foundZoneIndex = droppableZones.findIndex(
        (dZone) => dZone.id === over.id
      );

      if (foundZone) {
        const newDroppedZone = {
          ...foundZone,
          id: activeItem.id,
          item: activeItem,
        };

        // Make a copy and inject new zone
        const newDroppableZones = droppableZones.map((d) => d);
        newDroppableZones.splice(foundZoneIndex, 0, newDroppedZone);

        // Update droppable zones and filter out any empty zones
        updateDroppableZones([
          ...newDroppableZones.filter((dZone) => dZone.item),
        ]);

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

      const newDraggableItemsList = [...items, item];

      // Sorting the items list so that it would be based on ordinal for Hierarchies and name for Attributes
      const hierarchyItems = newDraggableItemsList.filter(
        (i) => i.type !== ItemType.Attribute
      );

      const attributeItems = newDraggableItemsList.filter(
        (i) => i.type === ItemType.Attribute
      );

      hierarchyItems.sort((a, b) => (a.ordinal <= b.ordinal ? -1 : 1));
      attributeItems.sort((a, b) =>
        a.name.toLowerCase() <= b.name.toLowerCase() ? -1 : 1
      );
      updateItems([...hierarchyItems, ...attributeItems]);
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
                newEntry={dZoneIndex !== 0}
                style={style}
              />
            );
          })}
        </DroppableContainerB>
      </DndContext>
    </div>
  );
};
