import './App.css'
import TodoPage from './pages/TodoPage/TodoPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import UserPage from './pages/UserPage/UserPage';
import MainLayout from './layouts/MainLayout';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/todos" replace />} />

          <Route path="todos" element={<TodoPage />} />
          <Route path="profile" element={<UserPage />} />         
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
