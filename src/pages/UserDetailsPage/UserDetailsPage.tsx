import { Button, Card, Form, Input, Space, Spin, Typography, notification } from "antd";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { selectCurrentUser } from "../../store/users/selectors";
import { fetchUserThunk, updateUserThunk } from "../../store/users/usersThunks";

const { Title } = Typography;

interface FormValues {
  userName: string;   // ← исправлено: было username
  email: string;
  phoneNumber: string;
}

export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<FormValues>();
  const [isEdit, setIsEdit] = useState(false);
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserThunk(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentUser.data) {
      form.setFieldsValue({
        userName: currentUser.data.userName,   // ← исправлено
        email: currentUser.data.email,
        phoneNumber: currentUser.data.phoneNumber,
      });
    }
  }, [currentUser.data, form]);

  if (currentUser.status === "pending") {
    return <Spin size="large" />;
  }

  const handleSave = async () => {
    if (!id) return;

    const values = form.getFieldsValue();
    const original = currentUser.data;
    const changedFields: Partial<FormValues> = {};

    (Object.keys(values) as Array<keyof FormValues>).forEach((key) => {
      if (values[key] !== original?.[key]) {
        changedFields[key] = values[key];
      }
    });

    if (Object.keys(changedFields).length === 0) {
      setIsEdit(false);
      return;
    }

    try {
      await dispatch(
        updateUserThunk({
          id: Number(id),
          data: changedFields,
        })
      ).unwrap();
      setIsEdit(false);
      dispatch(fetchUserThunk(Number(id)));
      notification.success({ message: "Данные обновлены" });
    } catch (error) {
      notification.error({
        message: "Ошибка обновления",
        description: "Не удалось сохранить изменения. Проверьте введённые данные.",
      });
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    // сброс формы к исходным данным, чтобы не оставалось изменённых значений
    if (currentUser.data) {
      form.setFieldsValue({
        userName: currentUser.data.userName,
        email: currentUser.data.email,
        phoneNumber: currentUser.data.phoneNumber,
      });
    }
  };

  return (
    <Card>
      <Title level={2}>Профиль пользователя</Title>

      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item label="Имя пользователя" name="userName">
          <Input disabled={!isEdit} />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input disabled={!isEdit} />
        </Form.Item>

        <Form.Item label="Телефон" name="phoneNumber">
          <Input disabled={!isEdit} />
        </Form.Item>

        <Space>
          <Button onClick={() => navigate("/users")}>Назад</Button>

          {!isEdit ? (
            <Button
              type="primary"
              onClick={(e) => {
                e.preventDefault();
                setIsEdit(true);
              }}
              htmlType="button"
            >
              Редактировать
            </Button>
          ) : (
            <>
              <Button htmlType="submit" type="primary">
                Сохранить
              </Button>
              <Button onClick={handleCancel}>Отмена</Button>
            </>
          )}
        </Space>
      </Form>
    </Card>
  );
}