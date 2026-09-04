import {
  Card,
  Input,
  Select,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUsers } from "../../store/users/selectors";
import {
  fetchUsersThunk,
  deleteUserThunk,
  updateBlockStatusThunk,
  updateRolesThunk,
} from "../../store/users/usersThunks";
import type { Role, UserOrderBy } from "../../types/admin";
import UsersTable from "../../components/Users/UsersTable";
import "./usersPage.scss"

const { Search } = Input;

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const usersState = useAppSelector(selectUsers);
  const users = usersState.data?.data ?? [];
  const total = usersState.data?.total ?? 0;

  const limit = 20;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<UserOrderBy>("userName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isBlocked, setIsBlocked] = useState<boolean | undefined>(undefined);

  const offset = (page - 1) * limit;

  useEffect(() => {
    dispatch(
      fetchUsersThunk({
        limit,
        offset,
        search,
        orderBy: sortBy,
        orderDir: sortOrder,
        isBlocked,
      })
    );
  }, [dispatch, limit, offset, search, sortBy, sortOrder, isBlocked]);

  const reload = () => {
    dispatch(
      fetchUsersThunk({
        limit,
        offset,
        search,
        orderBy: sortBy,
        orderDir: sortOrder,
        isBlocked,
      })
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteUserThunk(id)).unwrap();
      notification.success({ title: "Пользователь удалён" });
      reload();
    } catch {
      notification.error({ title: "Ошибка удаления" });
    }
  };

  const handleBlock = async (id: number) => {
    try {
      await dispatch(
        updateBlockStatusThunk({ id, data: { isBlocked: true } })
      ).unwrap();
      notification.success({ title: "Пользователь заблокирован" });
      reload();
    } catch {
      notification.error({ title: "Ошибка блокировки" });
    }
  };

  const handleUnblock = async (id: number) => {
    try {
      await dispatch(
        updateBlockStatusThunk({ id, data: { isBlocked: false } })
      ).unwrap();
      notification.success({ title: "Пользователь разблокирован" });
      reload();
    } catch {
      notification.error({ title: "Ошибка разблокировки" });
    }
  };

  const handleUpdateRoles = async (id: number, roles: Role[]) => {
    try {
      await dispatch(
        updateRolesThunk({ id, data: { roles } })
      ).unwrap();
      notification.success({ title: "Роли обновлены" });
      reload();
    } catch {
      notification.error({ title: "Ошибка обновления ролей" });
    }
  };

  const handleSort = (field: string, order: "ascend" | "descend") => {
    setSortBy(field as UserOrderBy);
    setSortOrder(order === "ascend" ? "asc" : "desc");
    setPage(1);
  };

  return (
    <Card title="Пользователи">
      <div className="users-page__header">
        <Search
          className="users-page__search"
          placeholder="Поиск по имени или email"
          allowClear
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />

        <Select
        className="users-page__filter"
          value={
            isBlocked === undefined
              ? "all"
              : isBlocked
                ? "blocked"
                : "active"
          }
          onChange={(value) => {
            if (value === "all") setIsBlocked(undefined);
            if (value === "blocked") setIsBlocked(true);
            if (value === "active") setIsBlocked(false);
            setPage(1);
          }}
          options={[
            { value: "all", label: "Все пользователи" },
            { value: "active", label: "Активные" },
            { value: "blocked", label: "Заблокированные" },
          ]}
        />
      </div>
      <UsersTable
        users={users}
        loading={usersState.status === "pending"}
        total={total}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        onDelete={handleDelete}
        onBlock={handleBlock}
        onUnblock={handleUnblock}
        onEdit={(id) => navigate(`/users/${id}`)}
        onUpdateRoles={handleUpdateRoles}
        onSort={handleSort}
      />
    </Card>
  );
}