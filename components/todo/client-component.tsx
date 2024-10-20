"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientTodo() {
  const [todos, setTodos] = useState<any[]>([]); // Muudame algväärtuse tühjaks massiiviks
  const [newTodo, setNewTodo] = useState("");
  const supabase = createClient();
  const router = useRouter();

  // get
  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("todos").select();
      setTodos(data || []); // Kui `data` on null, määrame tühja massiivi
    };
    getData();
  }, []);

  // add (create)
  const addTodo = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("todos")
      .insert([{ title: "new title", priority: 1 }])
      .select();
    router.refresh();

    return data;
  };

  // update
  const updateTodo = async (id: number, newTitle: string) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ title: newTitle })
      .eq("id", id);

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  // delete
  const deleteTodo = async (id: number) => {
    const { data, error } = await supabase.from("todos").delete().eq("id", id);

    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h1>TODOs</h1>
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="New TODO"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="border border-gray-300 rounded-lg p-3 flex justify-between items-center hover:bg-gray-100 transition"
              >
                <input
                  type="text"
                  value={todo.title}
                  onChange={(e) => updateTodo(todo.id, e.target.value)}
                  className="border-none p-0 w-full focus:outline-none"
                />
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition ml-4"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p>No TODOs found</p>
          )}
        </ul>
      </main>
    </>
  );
}
