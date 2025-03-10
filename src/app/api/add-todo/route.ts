import dbConnect from "@/lib/dbConnect";
import TodoModel from "@/model/Todo.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();
    console.log("-----------", title, description);
    await dbConnect();
    await TodoModel.create({ title, description });
    return NextResponse.json(
      { success: true, message: "Todo Created" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in creating todo ", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 404 }
    );
  }
}
