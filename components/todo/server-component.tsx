import { createClient } from "@/utils/supabase/server";

export default async function ServerTodo() {
  const supabase = createClient();

  let { data: todos, error } = await supabase.from("todos").select("*");

  if (!todos || todos.length === 0) {
    return <h1>No Todos found</h1>;
  }

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h1>Server Rendered TODOs</h1>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="border-b p-2">
              {todo.task}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
