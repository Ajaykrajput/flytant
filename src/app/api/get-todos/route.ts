import dbConnect from "@/lib/dbConnect";
import TodoModel from "@/model/Todo.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;

    // Fetch paginated todos
    const todos = await TodoModel.find()
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit);

    const total = await TodoModel.countDocuments();

    return NextResponse.json(
      {
        todos,
        meta: {
          total, // Total number of todos
          page, // Current page number
          limit, // Items per page
          pages: Math.ceil(total / limit), // Total pages
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
