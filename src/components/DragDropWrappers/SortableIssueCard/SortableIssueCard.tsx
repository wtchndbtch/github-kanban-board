import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";

import { Status } from "@/api";

type SortableCardProps = {
  children: ReactNode;
  id: number;
  status: Status;
};

const SortableIssueCard = ({ children, id, status }: SortableCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      status,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, opacity: isDragging ? 0 : 1 }}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export default SortableIssueCard;
