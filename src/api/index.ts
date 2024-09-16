"use client"
import axios, {Axios} from "axios";
import {ReconcileApi} from "@/api/repository/reconcile.repository";

export const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    headers: { "Content-Type": "application/json", Accept: "application/json"},
});


class Api {
    public reconcile: ReconcileApi;

    constructor(axios: Axios) {
        this.reconcile = new ReconcileApi(axios);
    }
}
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export const credRailApi = new Api(axiosInstance);
