import { SaveButton, getValueFromEvent, useForm } from '@refinedev/antd';
import {
  IResourceComponentsProps,
  useGetToPath,
  useGo,
  useTranslate,
} from '@refinedev/core';
import { Button, Flex, Form, Input, Modal, Select, theme } from 'antd';
import React from 'react';
import { ROLES } from './constants';
import { useSearchParams } from 'react-router-dom';
import { FormAvatarUpload } from 'src/components/form-avatar-upload';

type CreateFormSubmitProps = {
  email: string;
  name: string;
  password: string;
  roles: string[];
  avatar: any;
};

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, onFinish } = useForm({});
  const translate = useTranslate();
  const getToPath = useGetToPath();
  const [searchParams] = useSearchParams();
  const { token } = theme.useToken();
  const go = useGo();

  const handleModalClose = () => {
    go({
      to:
        searchParams.get('to') ??
        getToPath({
          action: 'list',
        }) ??
        '',
      query: {
        to: undefined,
      },
      options: {
        keepQuery: true,
      },
      type: 'replace',
    });
  };

  const handleSubmit = (formData: any) => {
    const data = formData as CreateFormSubmitProps;
    const avatar = data.avatar?.[0]?.response?.url ?? null;

    onFinish({
      ...data,
      avatar,
    });
  };

  return (
    <Modal
      open
      destroyOnClose
      maskClosable={false}
      title={translate('user.titles.create')}
      styles={{
        header: {
          padding: '20px 24px',
          margin: 0,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        },
        footer: {
          padding: '20px 24px',
          margin: 0,
          borderTop: `1px solid ${token.colorBorderSecondary}`,
        },
        content: {
          padding: 0,
        },
      }}
      footer={() => {
        return (
          <Flex align="center" justify="space-between">
            <Button onClick={handleModalClose}>
              {translate('buttons.cancel')}
            </Button>
            <SaveButton icon={false} {...saveButtonProps} />
          </Flex>
        );
      }}
      onCancel={handleModalClose}
    >
      <Flex
        vertical
        style={{
          padding: '20px 32px',
        }}
      >
        <Form {...formProps} onFinish={handleSubmit} layout="vertical">
          <Flex justify="center">
            <FormAvatarUpload formProps={formProps} />
          </Flex>
          <Form.Item
            label={translate('user.fields.email')}
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={translate('user.fields.name')} name="name">
            <Input />
          </Form.Item>
          <Form.Item
            label={translate('user.fields.password')}
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
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
      </Flex>
    </Modal>
  );
};
