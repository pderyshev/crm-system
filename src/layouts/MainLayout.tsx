import { useMemo } from "react"
import { Button, Layout, Menu } from "antd"
import type { MenuProps } from "antd"
import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router"

import { useAppDispatch, useAppSelector } from "../store/hooks"
import { logoutThunk } from "../store/auth/authThunks"
import { selectProfile } from "../store/auth/selectors"

import "./mainLayout.scss"
import { Roles } from "../types/admin"

const { Content, Sider } = Layout

const MainLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const profileState = useAppSelector(selectProfile)
  const profile = profileState.data

  const isAdminOrModerator = useMemo(() => {
    if (!profile) {
      return false
    }

    return (
      profile?.roles.includes(Roles.ADMIN) ||
      profile?.roles.includes(Roles.MODERATOR)
    )
  }, [profile])

  const items: MenuProps["items"] = [
    {
      key: "/todos",
      label: "Список задач",
    },
    {
      key: "/profile",
      label: "Личный кабинет",
    },

    ...(isAdminOrModerator
      ? [
        {
          key: "/users",
          label: "Пользователи",
        },
      ]
      : []),
  ]

  const handleLogout = async () => {
    await dispatch(logoutThunk())

    navigate("/login")
  }

  return (
    <Layout hasSider>
      <Sider
        className="sider-menu"
      >
        <Menu
          className="sider-menu__wrapper"
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
          onClick={({ key }) => navigate(key)}
        />

        <Button
          danger
          type="primary"
          size="large"
          onClick={handleLogout}
        >
          Выйти
        </Button>
      </Sider>

      <Layout>
        <Content className="sider-menu__content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout