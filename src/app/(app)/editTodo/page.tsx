'use client'

import { DeleteIcon } from "@/components/ui/Icons";
import { debounce } from "@/lib/utils";
import React, { useState } from "react";

const EditTodo: React.FC = ({ title }) => {
  const [showEditTitle, setShowEditTitle] = useState<boolean>(false);

  const changeTitle = debounce((ev: string) => {
    // updateBoard({ action: 'UPDATE', payload: { name: ev } });
    console.log("ev", ev);
  }, 7000);

  return (
    <div className="flex px-9 py-10 bg-foreground w-full flex-col h-full rounded-2xl border-border border-2 mt-10">
      <div className="flex justify-between items-center bg-amber-400 w-full">
        {showEditTitle ? (
          <input
            onChange={(e) => changeTitle(e.target.value)}
            value={title}
            className="border-none focus:border-none w-full px-8 py-2"
            type="text"
            placeholder="Topic Title"
          />
        ) : (
          <span
            className="text-4xl font-semibold max-w-[80%] truncate"
            onClick={() => setShowEditTitle(!showEditTitle)}
          >
            New Additions
          </span>
        )}
        <button
          type="button"
          className="bg-pink-300 py-4 px-2 hover:bg-red-300"
          aria-label="Delete"
        >
          <DeleteIcon />
        </button>
      </div>
      <div className="bg-green-400 w-full h-full mt-10">TextEditor</div>
    </div>
  );
};

export default EditTodo;
