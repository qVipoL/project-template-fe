import { DeleteButton, EditButton, List, useTable } from "@refinedev/antd";
import { BaseRecord, IResourceComponentsProps } from "@refinedev/core";
import { Space, Table } from "antd";
import React from "react";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column
          dataIndex="roles"
          title="Roles"
          render={(roles: string[]) => roles.join(", ")}
        />
        <Table.Column
          title="Actions"
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
