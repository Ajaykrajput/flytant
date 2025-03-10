import { Todo } from "@/types/Todo";
import React from "react";

interface TodoListCardProps {
  todo: Todo;
}

const TodoListCard: React.FC<TodoListCardProps> = ({ todo }) => {
  return (
    <div
      className="px-4 my-4 bg-primary py-2 w-full border-2 rounded-2xl border-slate-800"
      title={`Click on "${todo.title}" to see complete on right side`}
    >
      <h1 className="text-lg text-background font-semibold px-2 capitalize">
        {todo.title}
      </h1>
      <div className="flex items-center w-full justify-between p-2">
        <div
          className="mt-2 text-gray-700"
          dangerouslySetInnerHTML={{ __html: todo.description }}
        />
        <span className="text-muted text-sm mt-auto">
          {new Date(todo.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default TodoListCard;
