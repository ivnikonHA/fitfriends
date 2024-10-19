import { APIRoute } from '@fitfriends/utils';
import { api } from '@fitfriends/store';

interface FileUploadResponse {
  id: string;
  originalName: string;
  hashName: string;
  subDirectory: string;
  mimetype: string;
  size: number;
}

export const fileUploadService = async (file: File): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const { data } = await api.post<FileUploadResponse>(`${APIRoute.Upload}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  } catch (error) {
    throw new Error('Error uploading the file');
  }
};
