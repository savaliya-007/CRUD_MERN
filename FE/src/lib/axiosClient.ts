import axios from "axios";
const axiosClient =  axios.create({
    baseURL: "http://localhost:5000",
})


export const setAuthToken = (token: string,role: string): void => {
  const authparam = role == "admin"?"x-admin-auth-token":"x-user-auth-token"
    if (token) {
    axiosClient.defaults.headers[authparam] = token;
  } else {
    delete axiosClient.defaults.headers[authparam];
  }
};
export default axiosClient;