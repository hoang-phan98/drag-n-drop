import { useDrag } from "react-dnd";
import { TileType } from "./models/TileType";

import "./Tile.css";

export interface AttributeTileProps {
  name: string;
  type: string;
}

export const AttributeTile = ({ name }: AttributeTileProps) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: TileType.AttributeTile,
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <div
      className="tile attribute-tile"
      ref={dragPreview}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <button ref={drag}>{name}</button>
    </div>
  );
};
