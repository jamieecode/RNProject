import axios from 'axios';

const axiosInstance = axios.create({
  // 안드로이드 실행시 바꿔주기
  //baseURL: 'http://10.0.2.2:3030',

  baseURL: 'http://localhost:3030',
  withCredentials: true,
});

export default axiosInstance;
