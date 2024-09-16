"use client"
import React, {useEffect, useState} from "react";
import {useRecordStore} from "@/store/record";
import ReconcileComponent from "@/app/report/(components)/reconcile-component";
import {useNavPageStore} from "@/store/nav-page";

export default function ({params}:{params: any}) {
    const [isLoading, setIsLoading] = useState(true);
    const {getUploaded} = useRecordStore()
    const {setPageTitle} =useNavPageStore()
    useEffect(()=>{
        getUploaded({
            id: params.id as number,
            onSuccess:()=>{
                setIsLoading(false)
            }
        })
        setPageTitle('Upload Report')
    }, []);
    return isLoading ? <div className="h-96 flex justify-center items-center">Loading...</div> : <ReconcileComponent />
}