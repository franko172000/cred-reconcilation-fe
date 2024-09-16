import {IRecord, IRecordDiscrepancies} from "@/interfaces/records";

export interface IUpload {
    title: string,
    sourceFile: File,
    targetFile: File,
    description?: string
}

export interface IUploaded {
    id?: number;
    title: string;
    source_file: string;
    target_file: string;
    description?: string;
    discrepancies?: IRecordDiscrepancies[];
    missing_in_source?: IRecord[];
    missing_in_target?: IRecord[];
    record_count?: number;
    record_set?: IRecord[]
}