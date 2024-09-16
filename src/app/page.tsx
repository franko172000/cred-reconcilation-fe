'use client'
import {useRecordStore} from "@/store/record";
import {useEffect} from "react";
import UploadedComponent from "@/app/report/(components)/uploaded-component";
import {useNavPageStore} from "@/store/nav-page";

export default function (){
  const {listUploaded} = useRecordStore()
  const {setPageTitle} =useNavPageStore()
  useEffect(()=> {
    listUploaded({})
    setPageTitle('Uploads')
  }, [])
  return <UploadedComponent />
}
