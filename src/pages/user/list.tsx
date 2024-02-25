import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import {
  CreateButton,
  DeleteButton,
  EditButton,
  ExportButton,
  FilterDropdown,
  List,
  useTable,
} from '@refinedev/antd';
import {
  BaseRecord,
  getDefaultFilter,
  useExport,
  useTranslate,
} from '@refinedev/core';
import { Avatar, Input, InputNumber, Select, Space, Table, theme } from 'antd';
import { PropsWithChildren } from 'react';
import { User } from 'src/types';
import { ROLES } from './constants';

export const UserList = ({ children }: PropsWithChildren) => {
  const { tableProps, filters } = useTable<User>({
    syncWithLocation: true,
    filters: {
      initial: [],
    },
  });
  const translate = useTranslate();
  const { isLoading, triggerExport } = useExport<User>();

  return (
    <>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <Space>
            <ExportButton loading={isLoading} onClick={triggerExport} />
            <CreateButton />
          </Space>
        )}
      >
        <Table
          {...tableProps}
          rowKey="id"
          pagination={{
            ...tableProps.pagination,
            showSizeChanger: true,
          }}
        >
          <Table.Column
            width={100}
            dataIndex="id"
            title={translate('user.fields.id')}
            defaultFilteredValue={getDefaultFilter('id', filters, 'eq')}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <InputNumber addonBefore="#" style={{ width: '100%' }} />
              </FilterDropdown>
            )}
          />
          <Table.Column<User>
            width={150}
            dataIndex="avatar"
            title={translate('user.fields.avatar')}
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
            title={translate('user.fields.name')}
            defaultFilteredValue={getDefaultFilter('name', filters, 'contains')}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input />
              </FilterDropdown>
            )}
          />
          <Table.Column
            dataIndex="email"
            title={translate('user.fields.email')}
            defaultFilteredValue={getDefaultFilter(
              'email',
              filters,
              'contains',
            )}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input />
              </FilterDropdown>
            )}
          />
          <Table.Column
            dataIndex="roles"
            title={translate('user.fields.roles')}
            render={(roles: string[]) => roles.join(', ')}
            defaultFilteredValue={getDefaultFilter('roles', filters, 'in')}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select style={{ width: '200px' }} allowClear mode="multiple">
                  {Object.values(ROLES).map((role) => (
                    <Select.Option key={role} value={role}>
                      {role}
                    </Select.Option>
                  ))}
                </Select>
              </FilterDropdown>
            )}
          />
          <Table.Column
            title={translate('user.fields.actions')}
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
