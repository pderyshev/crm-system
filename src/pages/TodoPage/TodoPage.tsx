import { CreateTodo } from "../../components/CreateTodo/CreateTodo"
import TodoFilter from "../../components/TodoFilter/TodoFilter"
import { TodoListView } from "../../components/TodoList/TodoList"
import { getTodos } from "../../api/todo.api"
import "./todoPage.scss"
import {
  useState,
  useEffect
} from "react"
import type { RequestState } from "../../types/requestState"
import type {
  FilterTodo,
  MetaResponse,
  Todo,
  TodoInfo
} from "../../types/todo"

export default function TodoPage() {
  const [, setPageState] = useState<RequestState>({ status: "idle" })
  const [filterTodo, setFilterTodo] = useState<FilterTodo>("all")
  const [todoData, setTodoData] = useState<MetaResponse<Todo, TodoInfo>>()

  const loadTodoList = async (currentFilter = filterTodo) => {
    setPageState({ status: "pending" })

    try {
      const data = await getTodos(currentFilter)
      setTodoData(data)
      setPageState({ status: "success", })
    } catch (error) {
      setPageState({ status: "error", error })
    }
  }

  useEffect(() => {
    loadTodoList(filterTodo)

    const intervalId = setInterval(() => {
      loadTodoList(filterTodo)
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [filterTodo])

  return (
    <div className="todos">
      <CreateTodo onTodoCreated={loadTodoList} />
      <TodoFilter
        filter={filterTodo}
        setFilter={setFilterTodo}
        counts={todoData?.info || { all: 0, completed: 0, inWork: 0 }}
      />
      <TodoListView
        todoList={todoData?.data || []}
        updateTodoList={loadTodoList}
      />
    </div>
  )
}