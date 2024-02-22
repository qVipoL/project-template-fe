import { DeleteButton, EditButton, List, useTable } from "@refinedev/antd";
import {
  BaseRecord,
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import { Space, Table } from "antd";
import React from "react";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  const translate = useTranslate();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={translate("user.fields.id")} />
        <Table.Column dataIndex="name" title={translate("user.fields.name")} />
        <Table.Column
          dataIndex="email"
          title={translate("user.fields.email")}
        />
        <Table.Column
          dataIndex="roles"
          title={translate("user.fields.roles")}
          render={(roles: string[]) => roles.join(", ")}
        />
        <Table.Column
          title={translate("user.fields.actions")}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
