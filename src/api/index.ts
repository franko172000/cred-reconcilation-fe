"use client"
import axios, {Axios} from "axios";
import {ReconcileApi} from "@/api/repository/reconcile.repository";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
});


class Api {
    public reconcile: ReconcileApi;

    constructor(axios: Axios) {
        this.reconcile = new ReconcileApi(axios);
    }
}
export const credRailApi = new Api(axiosInstance);
