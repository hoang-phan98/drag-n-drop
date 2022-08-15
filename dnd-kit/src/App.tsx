import { useState } from "react";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

import "./App.css";
import { Playground } from "./components/Playground";

function App() {
  // const [isDropped, setIsDropped] = useState(false);
  // const draggableMarkup = <Draggable>Drag me</Draggable>;

  // function handleDragEnd(event: DragEndEvent) {
  //   if (event.over && event.over.id === "droppable") {
  //     setIsDropped(true);
  //   }
  // }

  return (
    <div className="app">
      <header className="app-header">
        <h1>dnd-kit</h1>
      </header>

      <div className="demo">
        {/* <DndContext onDragEnd={handleDragEnd}>
          {!isDropped ? draggableMarkup : null}
          <Droppable>{isDropped ? draggableMarkup : "Drop here"}</Droppable>
        </DndContext> */}

        <Playground />
      </div>
    </div>
  );
}

export default App;
