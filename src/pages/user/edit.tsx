import { Edit, useForm } from "@refinedev/antd";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Form, Input, Select } from "antd";
import React from "react";
import { ROLES, User } from "./constants";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<User>({});
  const translate = useTranslate();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label={translate("user.fields.email")} name="email">
          <Input />
        </Form.Item>
        <Form.Item label={translate("user.fields.name")} name="name">
          <Input />
        </Form.Item>
        <Form.Item label={translate("user.fields.password")} name="password">
          <Input />
        </Form.Item>
        <Form.Item label={translate("user.fields.roles")} name="roles">
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
