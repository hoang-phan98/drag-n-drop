import { Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import { HierarchyItem } from "./createData";

type ItemProps = {
    index: number,
    product: HierarchyItem
};

const ListItem = styled.div`
    padding: 8px;
    border: 1px solid black;
`;

export const Item = ({product, index}: ItemProps) => {
    return (
        <Draggable draggableId={product.id.toString()} index={index}>
            {(provided) => (
                <ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{product.name}</ListItem>
            )}
        </Draggable>
    )
}