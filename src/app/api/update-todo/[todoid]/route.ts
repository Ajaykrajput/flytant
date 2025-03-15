import dbConnect from "@/lib/dbConnect";
import TodoModel from "@/model/Todo.model";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const todoId = url.pathname.split("/").pop();
  const { newTitle: title, newDescription: description } = await request.json();

  if (!todoId) {
    return NextResponse.json(
      { message: "Todo ID is required" },
      { status: 400 }
    );
  }

  await dbConnect();

  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(todoId, {
      title,
      description,
    });

    if (!updatedTodo) {
      return NextResponse.json(
        { message: "Todo not updated" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Todo updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { message: "Server error in updating todo", success: false },
      { status: 500 }
    );
  }
}
