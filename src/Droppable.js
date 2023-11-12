import { useDroppable } from '@dnd-kit/core';

export default function Droppable({ id, children }) {
  const { setNodeRef } = useDroppable({ id });
  const style = {
    padding: '10px',
    border: '2px dashed #aaa',
    margin: '10px',
    minHeight: '100px',
    minWidth: '100px',
    background: '#fafafa',
  };

  return <div ref={setNodeRef} style={style}>{children}</div>;
}
