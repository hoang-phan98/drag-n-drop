import "./App.css";
import { Playground } from "./components/Playground";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>dnd-kit</h1>
      </header>

      <div className="demo">
        <Playground />
      </div>
    </div>
  );
}

export default App;
