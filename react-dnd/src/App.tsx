import "./App.css";
import { TileList } from "./components/TileList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LandingZone } from "./components/LandingZone";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React DND</h1>
      </header>

      <DndProvider backend={HTML5Backend}>
        <div className="demo">
          <TileList />
          <LandingZone />
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
