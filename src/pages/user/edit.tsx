import { Edit, useForm } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Form, Input, Select } from "antd";
import React from "react";
import { ROLES, User } from "./constants";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<User>({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input />
        </Form.Item>
        <Form.Item label="Roles" name="roles">
          <Select mode="multiple" placeholder="Select roles">
            {Object.values(ROLES).map((role) => (
              <Select.Option key={role} value={role}>
                {role}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Edit>
  );
};
