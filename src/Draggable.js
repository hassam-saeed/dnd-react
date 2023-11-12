import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export default function Draggable({ id, children, depth }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    padding: '10px',
    border: '1px solid #ccc',
    margin: '10px 0',
    marginLeft: depth * 20,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
