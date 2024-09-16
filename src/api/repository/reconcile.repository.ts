import {Axios} from "axios";
import {IUpload, IUploaded} from "@/interfaces/upload";
import {IRecord} from "@/interfaces/records";

export class ReconcileApi {
    constructor(private fetcher: Axios) {}

    async upload({title, sourceFile, targetFile, description}: IUpload) {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        const response = await this.fetcher.post(`/upload`, { title, source_file: sourceFile, target_file: targetFile, description }, config);
        return response.data;
    }

    async getUploads(): Promise<IUploaded[]> {
        const response = await this.fetcher.get<IUploaded[]>(`/upload`);
        return response.data;
    }

    async getUpload(id: number): Promise<IUploaded> {
        const response = await this.fetcher.get<IUploaded>(`/upload/${id}`);
        return response.data;
    }
}
