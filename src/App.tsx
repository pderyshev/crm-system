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

function App() {
  return (
    <Provider store={store}>
      <AuthInitializer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <Navigate
                  to="/todos"
                  replace
                />
              }
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
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App