import { UserOutlined } from "@ant-design/icons";
import { DeleteButton, EditButton, List, useTable } from "@refinedev/antd";
import { BaseRecord, useTranslate } from "@refinedev/core";
import { Avatar, Space, Table } from "antd";
import { PropsWithChildren } from "react";
import { User } from "src/types";

export const UserList = ({ children }: PropsWithChildren) => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  const translate = useTranslate();

  return (
    <>
      <List breadcrumb={false}>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            width={100}
            dataIndex="id"
            title={translate("user.fields.id")}
          />
          <Table.Column<User>
            width={150}
            dataIndex="avatar"
            title={translate("user.fields.avatar")}
            render={(_, record) =>
              record.avatar ? (
                <Avatar src={record.avatar} />
              ) : (
                <Avatar icon={<UserOutlined />} />
              )
            }
          />
          <Table.Column
            dataIndex="name"
            title={translate("user.fields.name")}
          />
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
      {children}
    </>
  );
};
