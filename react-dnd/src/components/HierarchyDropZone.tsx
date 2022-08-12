import { useDrop } from "react-dnd";
import { TileType } from "./models/TileType";

import "./HierarchyDropZone.css";
import { HierarchyTile } from "./HierarchyTile";

export interface HierarchyDropZoneProps {
  item?: string;
}

export const HierarchyDropZone = ({ item }: HierarchyDropZoneProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: TileType.HierarchyTile,
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      className="hierarchy-dropzone"
      ref={drop}
      //   role={'Dustbin'}
      style={{ backgroundColor: isOver ? "blue" : "white" }}
    >
      {item ? <HierarchyTile name={item} /> : <></>}
    </div>
  );
};
