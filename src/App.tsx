import "./App.css"
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router"
import { Provider } from "react-redux"
import { store } from "./store/store"
import TodoPage from "./pages/TodoPage/TodoPage"
import UserPage from "./pages/UserPage/UserPage"
import MainLayout from "./layouts/MainLayout"
import { LoginPage } from "./pages/LoginPage/LoginPage"
import { RegisterPage } from "./pages/RegisterPage/RegisterPage"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { PublicRoute } from "./routes/PublicRoute"
import { AuthInitializer } from "./store/auth/AuthInitializer"
import { NotificationProvider } from "./providers/NotificationProvider"

function App() {
  return (
    <Provider store={store}>
      <AuthInitializer />
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route
                path="/login"
                element={<LoginPage />}
              />
              <Route
                path="/register"
                element={<RegisterPage />}
              />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={<MainLayout />}
              >
                <Route
                  index
                  element={<Navigate to="/todos" replace />}
                />
                <Route
                  path="todos"
                  element={<TodoPage />}
                />
                <Route
                  path="profile"
                  element={<UserPage />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </Provider>
  )
}

export default App