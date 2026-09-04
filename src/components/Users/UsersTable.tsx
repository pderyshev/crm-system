import {
  Button,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
} from "antd";
import type {
  ColumnsType,
  TablePaginationConfig,
} from "antd/es/table";
import type {
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";

import { useState } from "react";

import type {
  Role,
  User,
} from "../../types/admin";

import UserRolesModal from "../UserRolesModal/UserRolesModal";

interface Props {
  users: User[];
  loading: boolean;
  total: number;
  page: number;

  onPageChange: (page: number) => void;

  onDelete: (id: number) => void;
  onBlock: (id: number) => void;
  onUnblock: (id: number) => void;
  onEdit: (id: number) => void;

  onUpdateRoles: (
    id: number,
    roles: Role[]
  ) => Promise<void>;

  onSort: (
    field: string,
    order: "ascend" | "descend"
  ) => void;
}

export default function UsersTable({
  users,
  loading,
  total,
  page,
  onPageChange,
  onDelete,
  onBlock,
  onUnblock,
  onEdit,
  onUpdateRoles,
  onSort,
}: Props) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [rolesModalOpen, setRolesModalOpen] = useState(false);

  const handleSaveRoles = async (roles: Role[]) => {
    if (!selectedUser) return;
    
    Modal.confirm({
      title: "Подтверждение изменения ролей",
      content: `Вы уверены, что хотите изменить роли для пользователя "${selectedUser.userName}"?`,
      okText: "Да",
      cancelText: "Отмена",
      onOk: async () => {
        await onUpdateRoles(selectedUser.id, roles)
        setRolesModalOpen(false)
      }
    })
  };

  const columns: ColumnsType<User> = [
    {
      title: "Имя",
      dataIndex: "userName",
      key: "userName",
      sorter: true,
      showSorterTooltip: false
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      showSorterTooltip: false
    },
    {
      title: "Дата регистрации",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) => {
        if (!value) return "—";
        const date = new Date(value);
        return date.toLocaleString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
    },
    {
      title: "Статус",
      key: "status",
      render: (_, user) =>
        user.isBlocked ? (
          <Tag color="red">Заблокирован</Tag>
        ) : (
          <Tag color="green">Активен</Tag>
        ),
    },
    {
      title: "Роли",
      key: "roles",
      render: (_, user) => user.roles.join(", "),
    },
    {
      title: "Телефон",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, user) => (
        <Space wrap>
          <Button onClick={() => onEdit(user.id)}>Профиль</Button>
          <Button
            onClick={() => {
              setSelectedUser(user);
              setRolesModalOpen(true);
            }}
          >
            Роли
          </Button>
          {user.isBlocked ? (
            <Button onClick={() => onUnblock(user.id)}>
              Разблокировать
            </Button>
          ) : (
            <Button danger onClick={() => onBlock(user.id)}>
              Заблокировать
            </Button>
          )}
          <Popconfirm
            title="Удалить пользователя?"
            okText="Да"
            cancelText="Нет"
            onConfirm={() => onDelete(user.id)}
          >
            <Button danger>Удалить</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table<User>
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={users}
        pagination={{
          current: page,
          total,
          pageSize: 20,
          onChange: onPageChange,
        }}
        onChange={(
          _: TablePaginationConfig,
          __: Record<string, FilterValue | null>,
          sorter: SorterResult<User> | SorterResult<User>[]
        ) => {
          if (
            !Array.isArray(sorter) &&
            sorter.field &&
            sorter.order
          ) {
            onSort(String(sorter.field), sorter.order);
          }
        }}
      />

      <UserRolesModal
        open={rolesModalOpen}
        roles={selectedUser?.roles ?? []}
        onCancel={() => setRolesModalOpen(false)}
        onSave={handleSaveRoles}
      />
    </>
  );
}