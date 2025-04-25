
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";

// Define the initial state for our kanban board
const initialDeals = {
  lead: [
    {
      id: "deal-1",
      title: "Acme Corp Software Implementation",
      client: "Acme Corporation",
      value: "$12,500",
      dueDate: "2023-06-15",
      assignedTo: "John Smith",
    },
    {
      id: "deal-2",
      title: "Globex IT Infrastructure",
      client: "Globex Inc.",
      value: "$24,000",
      dueDate: "2023-06-30",
      assignedTo: "Sarah Johnson",
    },
  ],
  qualified: [
    {
      id: "deal-3",
      title: "Wayne Enterprises Website Redesign",
      client: "Wayne Enterprises",
      value: "$18,750",
      dueDate: "2023-07-10",
      assignedTo: "Michael Brown",
    },
  ],
  proposal: [
    {
      id: "deal-4",
      title: "Stark Industries Cloud Migration",
      client: "Stark Industries",
      value: "$45,000",
      dueDate: "2023-07-22",
      assignedTo: "Emily Davis",
    },
  ],
  negotiation: [
    {
      id: "deal-5",
      title: "Oscorp ERP Implementation",
      client: "Oscorp Industries",
      value: "$32,000",
      dueDate: "2023-08-05",
      assignedTo: "David Wilson",
    },
  ],
  closed: [
    {
      id: "deal-6",
      title: "LexCorp Security Audit",
      client: "LexCorp",
      value: "$15,000",
      dueDate: "2023-06-10",
      assignedTo: "Jennifer Taylor",
    },
  ],
};

interface Deal {
  id: string;
  title: string;
  client: string;
  value: string;
  dueDate: string;
  assignedTo: string;
}

interface ColumnData {
  [key: string]: Deal[];
}

const columnTitles: Record<string, string> = {
  lead: "Leads",
  qualified: "Qualified",
  proposal: "Proposal",
  negotiation: "Negotiation",
  closed: "Closed",
};

const columnStyles: Record<string, string> = {
  lead: "bg-blue-100 border-blue-300",
  qualified: "bg-purple-100 border-purple-300",
  proposal: "bg-orange-100 border-orange-300",
  negotiation: "bg-yellow-100 border-yellow-300",
  closed: "bg-green-100 border-green-300",
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState<ColumnData>(initialDeals);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) return;

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the source column
    const sourceColumn = columns[source.droppableId];
    // Get the dragged item
    const draggedItem = sourceColumn[source.index];
    // Create a copy of the columns state
    const newColumns = { ...columns };
    
    // Remove from source column
    newColumns[source.droppableId] = sourceColumn.filter((_, idx) => idx !== source.index);
    
    // Add to destination column
    const destColumn = [...newColumns[destination.droppableId]];
    destColumn.splice(destination.index, 0, draggedItem);
    newColumns[destination.droppableId] = destColumn;
    
    setColumns(newColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {Object.keys(columns).map((columnId) => (
          <div key={columnId} className="flex flex-col min-w-[300px]">
            <h3 className="mb-3 text-lg font-semibold">
              {columnTitles[columnId]}
              <Badge variant="outline" className="ml-2">
                {columns[columnId].length}
              </Badge>
            </h3>
            <Droppable droppableId={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`kanban-column rounded-md border p-2 ${columnStyles[columnId]}`}
                >
                  {columns[columnId].map((deal, index) => (
                    <Draggable key={deal.id} draggableId={deal.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="kanban-card"
                        >
                          <Card>
                            <CardHeader className="p-3 pb-2">
                              <CardTitle className="text-base">{deal.title}</CardTitle>
                              <CardDescription>{deal.client}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                              <p className="text-lg font-semibold">{deal.value}</p>
                            </CardContent>
                            <CardFooter className="p-3 pt-0 flex justify-between text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(deal.dueDate).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                {deal.assignedTo}
                              </div>
                            </CardFooter>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
