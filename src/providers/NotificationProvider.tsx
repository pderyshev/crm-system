import { notification } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import { createContext, useContext, type PropsWithChildren } from "react";

const NotificationContext = createContext<NotificationInstance | null>(null)

export const NotificationProvider = ({
  children,
}: PropsWithChildren) => {
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