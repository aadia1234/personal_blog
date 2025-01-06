import axios from "axios";

export default axios.create({
  baseURL: "https://aadiananddeveloper05.com/blogapi",
  // baseURL: "http://127.0.0.1:8000/blogapi",
  headers: {
    Authorization: `Token ${import.meta.env.VITE_DJANGO_AUTH_TOKEN}`,
  },
});
