import { AttributeDropZone } from "./AttributeDropZone";
import { HierarchyDropZone } from "./HierarchyDropZone";

export interface DropzoneProps {}

export const Dropzone = ({}: DropzoneProps) => {
    return (
        <div className="dropzone">
            <HierarchyDropZone />
            <AttributeDropZone />
        </div>
    )
};
