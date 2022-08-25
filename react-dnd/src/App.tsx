import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DroppableContainerA } from "./components/droppable-containers/DroppableContainerA";
import { DroppableContainerB } from "./components/droppable-containers/DroppableContainerB";
import { ItemType } from "./components/models/ItemType";
import { useCallback, useEffect, useState } from "react";
import { ItemProps } from "./components/items/Item";
import { ItemList } from "./components/items/ItemList";
import { ZoneProps } from "./components/models/ZoneProps";
import { DroppableZone } from "./components/droppable-zones/DroppableZone";
import { DragSourceItem } from "./components/items/DraggableItem";
import { v4 as uuid } from "uuid";

const initialItems = [
  {
    id: "draggable-department-item",
    name: "Department",
    type: ItemType.Hierarchy,
    ordinal: 5,
  },
  {
    id: "draggable-category-item",
    name: "Category",
    type: ItemType.Leaf,
    ordinal: 4,
  },
  {
    id: "draggable-subcategory-item",
    name: "Sub-Category",
    type: ItemType.Hierarchy,
    ordinal: 3,
  },
  {
    id: "draggable-segment-item",
    name: "Segment",
    type: ItemType.Hierarchy,
    ordinal: 2,
  },
  {
    id: "draggable-product-item",
    name: "Product",
    type: ItemType.Leaf,
    ordinal: 1,
  },
  {
    id: "draggable-brand-item",
    name: "Brand",
    type: ItemType.Attribute,
    ordinal: -1,
  },
  {
    id: "draggable-variant-item",
    name: "Variant",
    type: ItemType.Attribute,
    ordinal: -1,
  },
  {
    id: "draggable-supplier-item",
    name: "Supplier",
    type: ItemType.Attribute,
    ordinal: -1,
  },
];

// Initially there's only one droppable zone.
// This grows as more items are dropped
const initialZone = {
  accepts: [ItemType.Hierarchy, ItemType.Leaf],
  id: `droppable-zone-${uuid()}`,
} as ZoneProps;

function App() {
  const [items, setItems] = useState<ItemProps[]>(initialItems);
  const [dropZones, setDropZones] = useState<ZoneProps[]>([initialZone]);
  const [draggingItem, setDraggingItem] = useState<ItemProps | undefined>(undefined);
  const useDropDependencies: [ItemProps[], ZoneProps[]] = [items, dropZones];
  const useDragDependencies: [ItemProps[]] = [items];

  const handleDrop = useCallback((item: DragSourceItem, zone: ZoneProps) => {
    if (zone.item != null) {
      return;
    }

    // Remove item from list
    const oldItem = items.find(i => i.id === item.id);
    const newItems = items.filter(i => i.id != item.id);

    // item not found
    if (oldItem === null) {
      console.log(`Item does not exist: ${item.id}`)
      return;
    };

    // Add item to drop zone
    const updatedZone = {
      ...zone,
      item: oldItem,
      ordinal: item.ordinal,
      isTemporary: false
    } as ZoneProps;
    const oldZoneIndex = dropZones.indexOf(zone);

    // Create new drop zone
    const newZone = {
      accepts: [ItemType.Attribute, ItemType.Hierarchy, ItemType.Leaf],
      id: `droppable-zone-${uuid()}`,
      ordinal: item.ordinal,
      isTemporary: false
    } as ZoneProps;

    const newDropZones = Array.from(dropZones);
    newDropZones.splice(oldZoneIndex, 1, updatedZone, newZone);

    // Update state
    setItems(newItems.sort((a, b) => b.ordinal - a.ordinal));
    setDropZones(newDropZones.filter(zone => zone.item !== undefined && !zone.isTemporary));
  }, [items, dropZones]);

  const handleRemove = useCallback((zone: ZoneProps) => {
    const newItems = Array.from(items);
    let newDropZones = Array.from(dropZones);

    const oldZoneIndex = dropZones.indexOf(zone);

    // Add items back to list
    dropZones.slice(oldZoneIndex).forEach(zone => {
      if (zone.item != null) {
        newItems.push(zone.item);
      };
    });

    // Remove zones
    newDropZones = newDropZones.slice(0, oldZoneIndex)
    newDropZones.push({
      ...zone,
      item: undefined,
      ordinal: undefined
    } as ZoneProps);

    // Update state
    setItems(newItems.sort((a, b) => b.ordinal - a.ordinal));
    setDropZones(newDropZones);
  }, [items, dropZones]);

  const handleDragStart = (item?: ItemProps) => {
    if (!item) {
      return;
    };

    // Generate temporary drop zones
    if (item.type === ItemType.Attribute) {
      const newDroppableZones: ZoneProps[] = [];
      dropZones.forEach(zone => {
        const newZone = {
          accepts: [ItemType.Attribute, ItemType.Hierarchy, ItemType.Leaf],
          id: `droppable-zone-${uuid()}`,
          isTemporary: true
        } as ZoneProps;

        if (zone.item) {
          newDroppableZones.push(zone);
          newDroppableZones.push(newZone);
        };
      });

      if (newDroppableZones.length > 0) {
        setDropZones(newDroppableZones);
      }

      // Insert new drop zone at the end if item is valid
    } else {
      const newDropZones = Array.from(dropZones);
      const lastZone = dropZones[dropZones.length - 1];
      if (lastZone &&
        (lastZone.item?.type === ItemType.Attribute ||
          (lastZone.ordinal && lastZone.ordinal > item.ordinal))) {
        const newZone = {
          accepts: [ItemType.Attribute, ItemType.Hierarchy, ItemType.Leaf],
          id: `droppable-zone-${uuid()}`,
          isTemporary: true
        } as ZoneProps;
        newDropZones.push(newZone);
      }
      setDropZones(newDropZones);
    };
  };

  // Remove temporary zones
  const handleDragEnd = () => {
    setDropZones(dropZones.filter(zone => !zone.isTemporary));
  };

  useEffect(() => {
    if (draggingItem) {
      handleDragStart(draggingItem);
    };
  }, [draggingItem]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>React DND</h1>
      </header>

      <DndProvider backend={HTML5Backend}>
        <div className="demo">
          <DroppableContainerA>
            <ItemList
              heading="Hierarchy Items"
              items={items.filter(item => item.type !== ItemType.Attribute)}
              setDraggingItem={setDraggingItem}
              useDragDependencies={useDragDependencies}
              handleDragEnd={handleDragEnd}
            />
            <ItemList
              heading="Attribute Items"
              items={items.filter(item => item.type === ItemType.Attribute)}
              setDraggingItem={setDraggingItem}
              useDragDependencies={useDragDependencies}
              handleDragEnd={handleDragEnd}
            />
          </DroppableContainerA>
          <DroppableContainerB>
            {dropZones.map((dropZone, index) => {
              const style = {
                marginLeft: `${index * 1.5}rem`,
              } as React.CSSProperties;
              return (
                <DroppableZone
                  key={index}
                  newEntry={index > 0}
                  zone={dropZone}
                  onRemove={handleRemove}
                  onDrop={handleDrop}
                  draggingItem={draggingItem}
                  setDraggingItem={setDraggingItem}
                  useDropDependencies={useDropDependencies}
                  useDragDependencies={useDragDependencies}
                  handleDragEnd={handleDragEnd}
                  style={style}
                />
              )
            })}
          </DroppableContainerB>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
