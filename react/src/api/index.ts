import { IUser } from "../Models/IUser";
import api from "./api";

// User APIs Call
const addUser = (data: IUser) => api.post(`/User/InsertUser`, data);
const getUsers = () => api.get(`/User/GetUsers`);
const login = (data: Object) => api.post(`/User/authenticate`, data);


export default {
    addUser,
    getUsers,
    login
}