import dbConnect from "@/lib/dbConnect";
import TodoModel from "@/model/Todo.model";
import { NextResponse } from "next/server"; // ✅ Use NextResponse in app directory

export async function PUT(
  request: Request,
  { params }: { params: { todoid: string } }
) {
  const todoId = params.todoid;
  const { newTitle: title, newDescription: description } = await request.json();
  console.log("%%%%%%%%%%%%,", title, description);

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
