import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { keys, values, map, filter } from 'lodash';

import Draggable from './Draggable';
import Droppable from './Droppable';

function App() {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`));
  const [droppedItems, setDroppedItems] = useState({});

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over) {
      setDroppedItems((prevItems) => {
        const newDroppedItems = { ...prevItems };
        const activeId = active.id;
        const overId = over.id;

        // Remove the active item from its current position in the tree
        keys(newDroppedItems).forEach((key) => {
          if (newDroppedItems[key].includes(activeId)) {
            newDroppedItems[key] = filter(newDroppedItems[key], (id) => id !== activeId);
          }
        });

        // If the item is dropped on the root or a different zone, update accordingly
        if (overId === 'root' || !newDroppedItems[activeId]) {
          newDroppedItems[overId] = [...(newDroppedItems[overId] || []), activeId];
        }

        return newDroppedItems;
      });

      // Only remove the item from the draggable list if it's not already dropped
      if (!values(droppedItems).flat().includes(active.id)) {
        setItems((currentItems) => filter(currentItems, (item) => item !== active.id));
      }

    } else {
      // If the item is dropped outside, it should only return to the list if it's not in the droppedItems
      if (!values(droppedItems).flat().includes(active.id)) {
        setItems((currentItems) => currentItems.includes(active.id) ? currentItems : [...currentItems, active.id]);
      }
    }

  };

  const renderDroppable = (id, depth = 0) => {
    return (
      <Droppable key={id} id={id}>
        {droppedItems[id]?.map((childId) => (
          <React.Fragment key={childId}>
            <Draggable id={childId} depth={depth}>
              {childId}
            </Draggable>
            {renderDroppable(childId, depth + 1)}
          </React.Fragment>
        ))}
      </Droppable>
    );
  };

  return (
    <React.Fragment>
      <h1 className='pl-30'>Drag and Drop React</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <div className='main-container'>
          <div>
            {map(items, (id) => (
              <Draggable key={id} id={id} depth={0}>
                {id}
              </Draggable>
            ))}
          </div>
          <div className='ml-50'>
            {renderDroppable('root')}
          </div>
        </div>
      </DndContext>
    </React.Fragment>
  );
}

export default App;
