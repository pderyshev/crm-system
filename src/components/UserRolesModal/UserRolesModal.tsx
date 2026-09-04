import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Modal,
} from "antd";

import { Roles, type Role } from "../../types/admin";
import "./userRolesModal.scss"

interface Props {
  open: boolean;
  roles: Role[];
  loading?: boolean;
  onCancel: () => void;
  onSave: (roles: Role[]) => void;
}

export default function UserRolesModal({
  open,
  roles,
  loading = false,
  onCancel,
  onSave,
}: Props) {
  const [selectedRoles, setSelectedRoles] = useState<Role[]>(roles);

  useEffect(() => {
    setSelectedRoles(roles);
  }, [roles]);

  return (
    <Modal
      title="Управление ролями"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button
          key="cancel"
          onClick={onCancel}
        >
          Отмена
        </Button>,

        <Button
          key="save"
          type="primary"
          loading={loading}
          onClick={() =>
            onSave(selectedRoles)
          }
        >
          Сохранить
        </Button>,
      ]}
    >
      <Checkbox.Group<Role>
        value={selectedRoles}
        onChange={(value) =>
          setSelectedRoles(value as Role[])
        }
        className="user-roles-modal__checkbox-group"
      >
          <Checkbox value={Roles.USER}>
            USER
          </Checkbox>

          <Checkbox value={Roles.ADMIN}>
            ADMIN
          </Checkbox>

          <Checkbox value={Roles.MODERATOR}>
            MODERATOR
          </Checkbox>
      </Checkbox.Group>
    </Modal>
  );
}