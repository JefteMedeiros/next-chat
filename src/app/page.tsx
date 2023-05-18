export interface Todo {
  id: number
  title: string
  done: boolean
  createdAt: string
  updatedAt: string
}

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/todos", {
    cache: "no-store",
  })

  const data: Todo[] = await res.json()

  return (
    <div>
      <h2 className="text-white">Todos</h2>
      {data.map((todo) => {
        return (
          <div
            className="border-2 borer-white p-2 flex flex-col gap-3 max-w-[400px]"
            key={todo.id}
          >
            <h1 className="text-white">{todo.title}</h1>
            <p className="text-white">{todo.done.toString()}</p>
          </div>
        )
      })}
    </div>
  )
}
