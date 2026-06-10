import React from "react"
import { Button, Layout, Menu } from "antd"
import type { MenuProps } from "antd"
import {
  Outlet,
  useLocation,
  useNavigate
} from "react-router"
import { useAppDispatch } from "../store/hooks"
import { logoutThunk } from "../store/auth/authThunks"

const { Content, Sider } = Layout

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
}

const items: MenuProps["items"] = [
  {
    label: "Список задач",
    key: "/todos",
  },
  {
    label: "Личный кабинет",
    key: "/profile",
  },
]

const MainLayout = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useAppDispatch()

  const handleLogout = async () => {
  await dispatch(logoutThunk()).unwrap();
  navigate("/login");
}

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
          onClick={({ key }) => navigate(key)}
        />
        <Button
          onClick={handleLogout}
          type="primary"
          danger
          size="large"
        >Выйти</Button>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout