import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { fetchProfileThunk } from "../../store/auth/authThunks"
import { Card, Descriptions, Spin, Typography } from "antd"

const { Title } = Typography

export default function UserPage() {

  const dispatch = useAppDispatch()
  const { profile, loading } = useAppSelector((state) => state.auth)
  
  useEffect(() => {
    dispatch(fetchProfileThunk())
  }, [dispatch])

  if(loading) {
    return <Spin size="large" />
  }
  
  return (
    <Card>
      <Title level={2}>Личный кабинет</Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Имя">{profile?.username ?? "-"}</Descriptions.Item>
        <Descriptions.Item label="Электронная почта">{profile?.email ?? "-"}</Descriptions.Item>
        <Descriptions.Item label="Телефон">{profile?.phoneNumber ?? "Не указан"}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}