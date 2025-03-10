"use client";

import React, { useState, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";
import { AddNoteIcon, SearchIcon } from "@/components/ui/Icons";
import TodoListCard from "@/components/TodoListCard";
import TodoSection from "@/components/TodoSection";
import Link from "next/link";
import { Todo } from "@/types/Todo";

const getTodos = async (page = 1, limit = 10): Promise<{ todos: Todo[] }> => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/get-todos?page=${page}&limit=${limit}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }

    return res.json();
  } catch (error) {
    console.error("Error loading todos: ", error);
    return { todos: [] };
  }
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 5; //  items you want per page

  const fetchTodos = useCallback(async (currentPage = 1) => {
    const { todos: newTodos } = await getTodos(currentPage, limit);

    if (currentPage === 1) {
      setTodos(newTodos);
    } else {
      setTodos((prevTodos) => [...prevTodos, ...newTodos]);
    }

    if (!newTodos || newTodos.length < limit) {
      setHasMore(false);
    }

    if (currentPage === 1 && newTodos.length > 0) {
      setSelectedTodo(newTodos[0]);
    }
  }, []);

  useEffect(() => {
    fetchTodos(page);
  }, [fetchTodos, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  return (
    <div className="flex w-full bg-[#F4F4F4] h-screen">
      <div className="w-1/3 mx-16 mt-16 rounded-2xl">
        <div className="flex justify-between p-2 w-full">
          <Link href={"/addTodo"} title="Click to add Todo">
            <Button
              btnType="btn-primary"
              iconLeft={<AddNoteIcon />}
              label="TODO"
            />
          </Link>
          <Button iconLeft={<SearchIcon />} label="" className="px-0" />
        </div>

        {todos && todos.length > 0 ? (
          <div className="mt-5 w-full h-full space-y-4 overflow-y-auto max-h-[70vh]">
            {todos.map((todo: Todo) => (
              <div
                key={todo._id}
                onClick={() => handleSelectTodo(todo)}
                className={`cursor-pointer ${
                  selectedTodo?._id === todo._id ? "bg-gray-200" : ""
                }`}
              >
                <TodoListCard todo={todo} />
              </div>
            ))}

            {hasMore && (
              <div className="flex justify-center mt-4 mr-auto">
                <Button
                  btnType="btn-primary"
                  label="Load More Todos"
                  onClick={handleLoadMore}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="mt-5 text-center text-gray-500">
            No todos to display
          </div>
        )}
      </div>

      <div className="w-2/3 bg-red-300 mr-16 mt-16 rounded-2xl">
        <TodoSection
          todo={selectedTodo}
          setTodos={setTodos}
          setSelectedTodo={setSelectedTodo}
          fetchTodos={() => fetchTodos(1)}
        />
      </div>
    </div>
  );
}
