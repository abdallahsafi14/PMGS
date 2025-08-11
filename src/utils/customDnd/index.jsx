import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdDragIndicator } from "react-icons/md";

const DragAndDropList = ({ items, onDragEnd, renderItem }) => {
  return (
   <div>
     <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ padding: "10px", border: "1px solid #ddd" }}
          >
            {items.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={String(item.id)}
                index={index}
              >
                {(provided) => (
                  <div className="card">
                    <div>
                      <MdDragIndicator />
                    </div>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        margin: "10px 0",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        backgroundColor: "#f9f9f9",
                        cursor: "pointer",
                      }}
                    >
                      {renderItem(item, index)}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
   </div>
  );
};

export default DragAndDropList;
