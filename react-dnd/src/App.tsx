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

function App() {
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

  const [dropZones, setDropZones] = useState<ZoneProps[]>([]);

  const handleDrop = () => {
    // To Do - Handle state update here
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React DND</h1>
      </header>

      <DndProvider backend={HTML5Backend}>
        <div className="demo">
          <DroppableContainerA>
            <ItemList heading="Hierarchy Items" items={items.filter(item => item.type !== ItemType.Attribute)}/>
            <ItemList heading="Attribute Items" items={items.filter(item => item.type === ItemType.Attribute)}/>
          </DroppableContainerA>
          <DroppableContainerB>
            {dropZones.map((dropZone) => {
              return <DroppableZone zone={dropZone} validDropLocation={true} onRemove={handleDrop}/>
            })}
          </DroppableContainerB>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
