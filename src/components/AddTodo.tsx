import { revalidatePath } from "next/cache"

export function AddTodo() {
  const handleAddTodo = async (data: FormData) => {
    "use server"

    data.get("isDone"),
      await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        body: JSON.stringify({
          title: data.get("title"),
          done: Boolean(Number(data.get("isDone"))),
        }),
      })

    revalidatePath("/")
  }

  return (
    <div className="flex flex-col max-w-[400px] my-4">
      <span className="text-white">Add todo</span>
      <form action={handleAddTodo}>
        <input type="text" className="text-red-500" name="title" />
        <div className="space-y-4 text-white">
          <span>Is done?</span>
          <div>
            <label htmlFor="true">True</label>
            <input type="radio" id="true" name="isDone" value={1} />
          </div>
          <div>
            <label htmlFor="false">False</label>
            <input type="radio" id="false" name="isDone" value={0} />
          </div>
        </div>
        <button className="border-2 p-2 text-white" type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
