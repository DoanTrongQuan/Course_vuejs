import axiosInstance from "./api.js";
import TokenService from "./token.service.js";


const API_URL_LOGIN = 'http://localhost:8088/api/v1/users/login';
const API_URL = "http://localhost:8088/api/v1/users/";
const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        // config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      console.log("Request being sent with token:", token);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  let refresh = false;
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/users/login" && err.response) {
        // Access Token was expired
        if (err.response.status === 403 && !refresh) {
          refresh = true;
          console.log("Token expired. Refreshing token...");
          // originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post('/users/refreshtoken', {
                refreshToken: TokenService.getLocalRefreshToken(),
                accessToken:TokenService.getLocalAccessToken()               
            });
            console.log(rs.data)

            const { token } = rs.data;
            

            store.dispatch('auth/refreshToken', token);
            TokenService.updateLocalAccessToken(token);

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
        
      }
      refresh = true;

      return Promise.reject(err);
    }
  );
};

export default setup;