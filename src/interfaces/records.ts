export interface IRecord {
    id?: number;
    name: string;
    account_number: string;
    transaction_date: string;
    balance: string;
    description?: string;
    upload?:number;
}

export interface IRecordDiscrepancies {
    id: number,
    differences: {
        [x:string] : {
            source: any,
            target: any,
        }
    }
}