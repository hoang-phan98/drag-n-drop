import { useDrop } from "react-dnd";
import { TileType } from "./models/TileType";

export const AttributeDropZone = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: TileType.AttributeTile,
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      className="attribute-dropzone"
      ref={drop}
      //   role={'Dustbin'}
      style={{ backgroundColor: isOver ? "red" : "white" }}
    >
      {canDrop ? "Release to drop" : "Drag a box here"}
    </div>
  );
};
