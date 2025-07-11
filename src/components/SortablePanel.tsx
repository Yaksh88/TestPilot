
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";
import { GripVertical } from "lucide-react";

interface SortablePanelProps {
  id: string;
  children: ReactNode;
}

const SortablePanel = ({ id, children }: SortablePanelProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group rounded-xl shadow-md"
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-200 p-1 rounded-full cursor-grab group-hover:opacity-100 opacity-0 transition"
        title="Drag to rearrange"
      >
        <GripVertical size={16} />
      </div>

      {/* Panel Content (matches original layout) */}
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-md">
        {children}
      </div>
    </div>
  );
};

export default SortablePanel;
