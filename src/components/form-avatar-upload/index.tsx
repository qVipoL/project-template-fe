import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import { uploadFileRequest } from 'src/api/file';
import { RcFile } from 'antd/lib/upload';
import { useApiUrl, useNotification, useTranslate } from '@refinedev/core';
import { UseFormReturnType, getValueFromEvent } from '@refinedev/antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type Props = {
  formProps: UseFormReturnType<any>['formProps'];
};

export const FormAvatarUpload = ({ formProps }: Props) => {
  const [loading, setLoading] = useState(false);
  const apiUrl = useApiUrl();
  const translate = useTranslate();
  const notification = useNotification();

  const avatars = Form.useWatch('avatar', formProps.form);
  const avatar = avatars?.[0] || null;
  const previewImageURL = Array.isArray(avatars)
    ? avatar?.url || avatar?.response?.url
    : avatars;

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/png';

    if (!isJpgOrPng) {
      notification.open?.({
        type: 'error',
        message: translate('errors.file.onlyPng'),
      });
    }

    const isLt1M = file.size / 1024 / 1024 < 1;

    if (!isLt1M) {
      notification.open?.({
        type: 'error',
        message: translate('errors.file.1mbLimit'),
      });
    }

    if (isJpgOrPng && isLt1M) {
      setLoading(true);

      return true;
    }

    return false;
  };

  return (
    <Form.Item
      name="avatar"
      valuePropName="avatar"
      getValueFromEvent={getValueFromEvent}
      style={{
        margin: 0,
      }}
    >
      <Upload
        style={{ width: 'fit-content' }}
        name="file"
        listType="picture-circle"
        accept=".png"
        showUploadList={false}
        maxCount={1}
        beforeUpload={beforeUpload}
        action={`${apiUrl}/file/upload`}
      >
        {previewImageURL ? (
          <img src={previewImageURL} alt="avatar" style={{ width: '100%' }} />
        ) : (
          <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>{translate('forms.upload')}</div>
          </button>
        )}
      </Upload>
    </Form.Item>
  );
};
