import styled from 'styled-components';
import { Column } from './Column';
import { products, columns, DndColumn } from './createData';
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const isSameDestination = (source: DraggableLocation, destination: DraggableLocation) => {
  return source.droppableId === destination.droppableId;
};

const getColumnAndIndex = (location: DraggableLocation, columns: DndColumn[]): [DndColumn, number] => {
  const column = columns.find(col => col.columnId.toString() === location.droppableId)!;
  const index = columns.indexOf(column);
  return [column, index];
};

function App() {
  const [cols, setCols] = useState<DndColumn[]>(columns);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination || isSameDestination(source, destination)) {
      return;
    };

    const [sourceColumn, sourceIndex] = getColumnAndIndex(source, cols);
    const [destinationColumn, destinationIndex] = getColumnAndIndex(destination, cols);
    const newSourceItems = Array.from(sourceColumn.itemIds);
    const newDestinationItems = Array.from(destinationColumn.itemIds);

    newSourceItems.splice(source.index, 1);
    newDestinationItems.splice(destination.index, 0, draggableId);
    newDestinationItems.sort();

    const newSourceColumn = {
      ...sourceColumn,
      itemIds: newSourceItems
    };

    const newDestinationColumn = {
      ...destinationColumn,
      itemIds: newDestinationItems
    }

    const newCols = Array.from(cols);
    newCols.splice(sourceIndex, 1, newSourceColumn);
    newCols.splice(destinationIndex, 1, newDestinationColumn);
    setCols(newCols);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {cols.map((column, index) => {
          const items = column.itemIds.map(id => products.filter(product => product.id === id)).flat();
          return <Column key={index} column={column} products={items} />
        })}
      </Container>
    </DragDropContext>
  );
}

export default App;
