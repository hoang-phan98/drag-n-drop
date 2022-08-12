import { HierarchyTile } from "./HierarchyTile";
import "./TileList.css";

export interface TileListProps {}

export const TileList = () => {
  return (
    <ul className="tile-list">
      <li>
        <HierarchyTile name="Product" />
      </li>
    </ul>
  );
};
