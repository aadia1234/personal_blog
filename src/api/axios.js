import axios from 'axios';

export default axios.create({baseURL: "http://localhost:8000/blogapi"});

export function testFunction() {
    console.log("test!")
}