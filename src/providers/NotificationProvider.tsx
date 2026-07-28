import { notification } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import { createContext, useContext } from "react";

const NotificationContext = createContext<NotificationInstance | null>(null)

export const NotificationProvider = ({
  children,
} : {
  children: React.ReactNode
}) => {
  const [api, contextHolder] = notification.useNotification()

  return (
    <NotificationContext.Provider value={api}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error (
      "useNotification необходимо использовать внутри NotificationProvider"
    )
  }

  return context
}