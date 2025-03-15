import dbConnect from "@/lib/dbConnect";
import TodoModel from "@/model/Todo.model";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { pathname } = new URL(request.url);
  const segments = pathname.split("/");
  const todoId = segments[segments.length - 1];

  if (!todoId) {
    return NextResponse.json(
      { message: "Todo ID is required" },
      { status: 400 }
    );
  }

  await dbConnect();

  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { message: "Server error deleting todo", success: false },
      { status: 500 }
    );
  }
}
