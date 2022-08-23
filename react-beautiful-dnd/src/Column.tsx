import { DndColumn, HierarchyItem } from './createData';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { Item } from './Item';

type ColumnProps = {
    key: number,
    column: DndColumn,
    products: HierarchyItem[]
};

const Container = styled.div`
    margin: 8px;
    border: 1px solid black;
    min-width: 300px;
    min-height: 200px;
`;

const Title = styled.h3`
    padding: 8px;
`;

const List = styled.div`
    padding: 8px;
`;
  
export const Column = ({key, column, products}: ColumnProps) => {
    return (
        <Container key={key}>
            <Title>
                {column.title}
            </Title>
            <Droppable droppableId={column.columnId.toString()}>
                {(provided, snapshot) => (
                    <List ref={provided.innerRef} {...provided.droppableProps} style={{ backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey' }}>
                        {products.map((product, index) => {
                            return (
                                <Item key={product.id} index={index} product={product}/>
                            )
                        })}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </Container>
    )
}