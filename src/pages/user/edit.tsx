import { Edit, useForm } from '@refinedev/antd';
import { IResourceComponentsProps, useTranslate } from '@refinedev/core';
import { Flex, Form, Input, Select } from 'antd';
import React from 'react';
import { ROLES } from 'src/constants/enums';
import { User } from 'src/types';
import { FormAvatarUpload } from 'src/components/form-avatar-upload';

type EditFormSubmitProps = {
  email: string;
  name: string;
  password: string;
  roles: string[];
  avatar: any;
};

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, onFinish } = useForm<User>({});
  const translate = useTranslate();

  const handleSubmit = (formData: any) => {
    const data = formData as EditFormSubmitProps;
    const avatar = data.avatar?.[0]?.response?.url ?? null;

    onFinish({
      ...data,
      avatar,
    });
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} onFinish={handleSubmit} layout="vertical">
        <Flex justify="center">
          <FormAvatarUpload formProps={formProps} />
        </Flex>
        <Form.Item label={translate('user.fields.email')} name="email">
          <Input />
        </Form.Item>
        <Form.Item label={translate('user.fields.name')} name="name">
          <Input />
        </Form.Item>
        <Form.Item label={translate('user.fields.password')} name="password">
          <Input />
        </Form.Item>
        <Form.Item label={translate('user.fields.roles')} name="roles">
          <Select mode="multiple">
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
