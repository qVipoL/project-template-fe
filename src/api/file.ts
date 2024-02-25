import { apiInstance } from './api';

export const FileEndpoints = {
  upload: '/file/upload',
};

type UploadFileDto = {
  file: File;
};

type UploadFileResponse = {
  url: string;
};

export const uploadFileRequest = async ({ file }: UploadFileDto) => {
  const formData = new FormData();
  formData.append('file', file);

  return apiInstance.post<UploadFileResponse>(FileEndpoints.upload, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
