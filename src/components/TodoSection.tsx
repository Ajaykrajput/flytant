import React, { useState, useEffect, useRef } from "react";
import { DeleteIcon } from "./ui/Icons";
import { Todo } from "@/types/Todo";
import { debounce } from "@/lib/utils";

import dynamic from "next/dynamic";

const DescriptionEditor = dynamic(() => import("./DescriptionEditor"), {
  ssr: false,
});

interface TodoSectionProps {
  todo: Todo | null;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  fetchTodos: () => Promise<void>;
}

const TodoSection: React.FC<TodoSectionProps> = ({
  todo,
  setTodos,
  setSelectedTodo,
  fetchTodos,
}) => {
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState<string>("");

  const debouncedUpdateTodoRef =
    useRef<
      (args: {
        updatedTitle: string;
        updatedDescription: string;
      }) => void | null
    >(null);

  useEffect(() => {
    if (todo) {
      setNewTitle(todo.title);
    }

    if (todo) {
      setNewDescription(todo.description || "");
    }

    if (todo) {
      debouncedUpdateTodoRef.current = debounce(
        async ({
          updatedTitle,
          updatedDescription,
        }: {
          updatedTitle: string;
          updatedDescription: string;
        }) => {
          try {
            const res = await fetch(
              `http://localhost:3000/api/update-todo/${todo._id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  newTitle: updatedTitle,
                  newDescription: updatedDescription,
                }),
              }
            );

            if (!res.ok) {
              throw new Error("Failed to update todo");
            }

            fetchTodos();
            console.log("Todo updated successfully");
          } catch (error) {
            console.error(error);
          }
        },
        500
      );
    }
  }, [todo, fetchTodos]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTitle = e.target.value;
    setNewTitle(updatedTitle);

    debouncedUpdateTodoRef.current?.({
      updatedTitle,
      updatedDescription: newDescription,
    });
  };

  const handleDescriptionChange = (updatedDescription: string) => {
    setNewDescription(updatedDescription);

    debouncedUpdateTodoRef.current?.({
      updatedTitle: newTitle,
      updatedDescription,
    });
  };

  const deleteTodo = async () => {
    if (!todo) return;

    const confirmed = confirm("Are you sure you want to delete this todo?");
    if (!confirmed) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/delete-todo/${todo._id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setTodos((prevTodos) => {
          const updatedTodos = prevTodos.filter((t) => t._id !== todo._id);
          setSelectedTodo(updatedTodos.length > 0 ? updatedTodos[0] : null);
          return updatedTodos;
        });
      } else {
        console.error("Failed to delete the todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  if (!todo) {
    return (
      <div className="flex items-center justify-center h-full text-lg">
        Select a Todo to see details
      </div>
    );
  }

  return (
    <div className="flex px-9 py-10 bg-foreground w-full flex-col h-full rounded-2xl border-border border-2">
      <div className="flex justify-between items-center w-full">
        {showEditTitle ? (
          <input
            onChange={handleTitleChange}
            value={newTitle}
            className="border-none focus:border-none w-full px-8 py-2"
            type="text"
            placeholder="Todo Title"
            onBlur={() => setShowEditTitle(false)}
          />
        ) : (
          <span title="Click on title to edit"
            className="text-4xl font-semibold max-w-[80%] truncate cursor-pointer"
            onClick={() => setShowEditTitle(true)}
          >
            {newTitle}
          </span>
        )}

        <button
          title="Click on trash button to delete"
          type="button"
          className="py-4 px-4 rounded-full hover:bg-red-300"
          aria-label="Delete"
          onClick={deleteTodo}
        >
          <DeleteIcon />
        </button>
      </div>

      <div className=" w-full h-full mt-10 p-4" title="Click on description content to edit the todo">
        <DescriptionEditor
          description={newDescription}
          onChange={handleDescriptionChange}
        />
      </div>
    </div>
  );
};

export default TodoSection;
