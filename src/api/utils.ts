import { AxiosError, type AxiosResponse } from "axios";

export const extractData = <T = any>(response: AxiosResponse): Promise<T> => {
    return response.data;
};

export const extractError = (e: unknown) => {
    if (e instanceof AxiosError) {
        if (Array.isArray(e.response?.data)) {
            return e.response?.data.join(", ");
        }
        if (e.response?.data?.detail) {
            if (Array.isArray(e.response.data.detail)) {
                return e.response.data.detail.join(", ");
            } else {
                return e.response.data.detail;
            }
        }
        return e.response?.data?.message;
    } else if (e instanceof Error) {
        return e.message;
    } else {
        return "Something went wrong";
    }
};
