import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DroppableContainerA } from "./components/droppable-containers/DroppableContainerA";
import { DroppableContainerB } from "./components/droppable-containers/DroppableContainerB";
import { ItemType } from "./components/models/ItemType";
import { useState } from "react";
import { ItemProps } from "./components/items/Item";
import { ItemList } from "./components/items/ItemList";
import { ZoneProps } from "./components/models/ZoneProps";
import { DroppableZone } from "./components/droppable-zones/DroppableZone";
import { DragSourceItem } from "./components/items/DraggableItem";

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
];

// Initially there's only one droppable zone.
// This grows as more items are dropped
const initialZone = {
  accepts: [ItemType.Hierarchy, ItemType.Leaf],
  id: "droppable-zone-0",
  item: null,
} as ZoneProps;

function App() {
  const [items, setItems] = useState<ItemProps[]>(initialItems);
  const [dropZones, setDropZones] = useState<ZoneProps[]>([initialZone]);
  const [isDragging, setIsDragging] = useState(true);

  const handleDrop = (item: DragSourceItem, zone: ZoneProps) => {
    if (zone.item != null) {
      return;
    }

    // Remove item from list
    const oldItem = items.find(i => i.id == item.id);
    const newItems = items.filter(i => i.id != item.id);
    console.log(newItems.filter(i => i.type != ItemType.Attribute));

    // item not found
    if (oldItem == null) {
      console.log(`Item does not exist: ${item.id}`)
      return;
    };

    // Add item to drop zone
    const updatedZone = {
      ...zone,
      item: oldItem
    };
    const oldZoneIndex = dropZones.indexOf(zone);

    // Create new drop zone
    const newZone = {
      accepts: [ItemType.Attribute, ItemType.Hierarchy, ItemType.Leaf],
      id: `droppable-zone-${dropZones.length}`,
      item: null
    };

    const newDropZones = Array.from(dropZones);
    newDropZones.splice(oldZoneIndex, 1, updatedZone, newZone);

    // Update state
    setItems(newItems);
    setDropZones(newDropZones);
  };

  const handleRemove = (zone: ZoneProps) => {
    const newItems = Array.from(items);
    let newDropZones = Array.from(dropZones);

    // Remove item from drop zone
    const oldZoneIndex = dropZones.indexOf(zone);

    for (let i=oldZoneIndex; i<dropZones.length; i++) {
      let zone = dropZones[i];
      let item = zone.item;
      // Add item back to list
      if (item != null) newItems.push(item);
    };

    newDropZones = newDropZones.slice(0, oldZoneIndex)
    
    newDropZones.push({
      ...zone,
      item: null
    });

    // Update state
    setItems(newItems);
    setDropZones(newDropZones);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React DND</h1>
      </header>

      <DndProvider backend={HTML5Backend}>
        <div className="demo">
          <DroppableContainerA>
            <ItemList heading="Hierarchy Items" items={items.filter(item => item.type !== ItemType.Attribute)} setIsDragging={setIsDragging}/>
            <ItemList heading="Attribute Items" items={items.filter(item => item.type === ItemType.Attribute)} setIsDragging={setIsDragging}/>
          </DroppableContainerA>
          <DroppableContainerB>
            {dropZones.map((dropZone, index) => {
              const style = {
                marginLeft: `${index * 1.5}rem`,
              } as React.CSSProperties;
              return (
                <DroppableZone
                  key={index} 
                  zone={dropZone} 
                  onRemove={handleRemove}
                  onDrop={handleDrop}
                  isDragging={isDragging}
                  setIsDragging={setIsDragging}
                  style={style}
                />
            )})}
          </DroppableContainerB>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
