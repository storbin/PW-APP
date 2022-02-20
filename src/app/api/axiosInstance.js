import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const onRequest = async (config) => {
  const token = await AsyncStorage.getItem("token");

  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
};

const onResponse = async (response) => {
  const token = response.data.id_token;

  if (token) {
    await AsyncStorage.setItem("token", token);
  }

  return response;
};

const axiosInstance = axios.create({
  baseURL: "http://193.124.114.46:3001/",
});

axiosInstance.interceptors.request.use(onRequest);

axiosInstance.interceptors.response.use(onResponse);

export { axiosInstance };
