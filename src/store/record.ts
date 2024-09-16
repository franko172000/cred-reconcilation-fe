import {create} from "zustand";
import {credRailApi} from "@/api";
import {IUploaded} from "@/interfaces/upload";

type RecordStateType = {
    uploaded: IUploaded | null
    uploadedList: IUploaded[]
}

const recordState: RecordStateType = {
    uploaded: null,
    uploadedList: []
}

type RecordAction = {
    listUploaded: ({onSuccess, onError}:{
        onSuccess?: ()=> void,
        onError?:(err?: any)=>void
    })=> void;
    setRecord: (uploaded: IUploaded | null)=>void;
    getUploaded: ({id,onSuccess, onError}:{
        onSuccess?: ()=> void,
        onError?:(err?: any)=>void
        id: number
    })=>void;
}

export const useRecordStore = create<RecordStateType & RecordAction>((set) => ({
    ...recordState,
    getUploaded: async ({id,onSuccess,onError}) => {
        try{
            const uploaded = await credRailApi.reconcile.getUpload(id)
            if(uploaded){
                onSuccess?.()
                set(()=> ({
                    uploaded
                }))
            }
        }catch (err){
            onError?.(err)
        }
    },
    setRecord: (uploaded)=> set(()=> ({uploaded})),
    listUploaded: async ({onSuccess,onError}) => {
        try{
            const records = await credRailApi.reconcile.getUploads()
            if(records){
                onSuccess?.()
                set(()=> ({
                    uploadedList: records
                }))
            }
        }catch (err){
            onError?.(err)
        }
    }
}))