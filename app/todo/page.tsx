import ClientTodo from "@/components/todo/client-component";
import ServerTodo from "@/components/todo/server-component";

export default async function Index() {
  return (
    <>
      <ServerTodo />
      <ClientTodo />
    </>
  );
}
