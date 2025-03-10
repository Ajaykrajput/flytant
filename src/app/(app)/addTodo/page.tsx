"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function AddTodo() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/add-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 max-w-3xl min-h-64 mx-auto mt-16 bg-foreground p-10 rounded-2xl border-2 border-border"
    >
      <input
        onChange={handleTitleChange}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Todo Title"
      />

      <textarea
        onChange={handleDescriptionChange}
        value={description}
        className="border border-slate-500 px-8 py-2"
        // type="text"
        rows={4}
        placeholder="Todo Description"
      />

      <Button
        btnType="btn-primary"
        label="Add TODO"
        type="submit"
        className="w-fit mt-auto"
      />
    </form>
  );
}
