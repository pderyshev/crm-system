import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProfileThunk } from "../../store/auth/authThunks";
import { Card, Descriptions, Spin, Typography, notification } from "antd";
import {
  selectProfileData,
  selectProfileLoading,
  selectProfileError,
} from "../../store/auth/selectors";

const { Title } = Typography;

export default function UserPage() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfileData);
  const isLoading = useAppSelector(selectProfileLoading);
  const error = useAppSelector(selectProfileError);

  useEffect(() => {
    dispatch(fetchProfileThunk());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      notification.error({
        title: "Ошибка загрузки профиля",
        description: "Не удалось загрузить данные пользователя",
      });
    }
  }, [error]);

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (!profile) {
    return <div>Нет данных пользователя</div>;
  }

  return (
    <Card>
      <Title level={2}>Личный кабинет</Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Имя">
          {profile.userName ?? "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Электронная почта">
          {profile.email ?? "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Телефон">
          {profile.phoneNumber ?? "Не указан"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}