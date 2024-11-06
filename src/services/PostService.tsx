// PostService.tsx

import axios, { AxiosResponse } from "axios";

interface PostResponse {
  success: boolean;
  data?: any;
  msg?: string;
}

class PostService {
  create(formData: FormData): Promise<AxiosResponse<PostResponse>> {
    const url = "http://localhost:8000/api/create-post";
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return axios.post(url, formData, config);
  }

  getPosts(): Promise<AxiosResponse<PostResponse>> {
    const url = "http://localhost:8000/api/get-posts";
    return axios.get(url);
  }

  deletePost(id: string): Promise<AxiosResponse<PostResponse>> {
    const url = `http://localhost:8000/api/delete-Post/${id}`;
    return axios.get(url);
  }

  update(formData: FormData): Promise<AxiosResponse<PostResponse>> {
    const url = "http://localhost:8000/api/update-post";
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return axios.post(url, formData, config);
  }
}

// Export the service as a default export
export default new PostService();
