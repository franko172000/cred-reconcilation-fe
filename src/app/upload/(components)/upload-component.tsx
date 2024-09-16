import {FC, useEffect, useState} from 'react'
import {object, string, mixed} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {credRailApi} from "@/api";
import {IUpload} from "@/interfaces/upload";
import Loader from "@/shared/components/loader";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'
import {useNavPageStore} from "@/store/nav-page";
import {extractError} from "@/api/utils";


interface UploadValues {
    title: string;
    description?: string;
    targetFile?: File;
    sourceFile?: File;
}

const isValidFormat = (file: any)=>{
    const acceptedFormats = ['csv'];
    const fileExtension = file[0]?.name.split('.').pop().toLowerCase();
    return acceptedFormats.includes(fileExtension)
}

const isValidSize = (file: any)=>{
    return file[0] && file[0]?.size <= 4 * 1024// 3mb
}

const validationSchema = object().shape({
    title: string().required('Please enter a title'),
    description: string(),
    // targetFile: mixed<File>()
    //     .test("required",'Please select target file', (targetFile)=> !!targetFile)
    //     .test("required",'Invalid file format. Only CSV files are allowed.', (targetFile?: any)=> isValidFormat(targetFile))
    //     .test("required",'File too large. Max file size is 5mb', (targetFile: any)=> isValidSize(targetFile)),
    // sourceFile: mixed<File>()
    //     .test("required",'Please select source file', (targetFile)=> !!targetFile)
    //     .test("required",'Invalid file format. Only CSV files are allowed.', (targetFile?: any)=> isValidFormat(targetFile))
    //     .test("required",'File too large. Max file size is 5mb', (targetFile: any)=> isValidSize(targetFile)),
});

const UploadComponent: FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const router =  useRouter()
    const {setPageTitle} = useNavPageStore()
    const { control, handleSubmit, formState, formState: {errors}, register } = useForm<UploadValues>({
        defaultValues: {
            title: "",
            description: "",
            targetFile: undefined,
            sourceFile: undefined
        },
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = handleSubmit(async (data, e) => {
        e?.preventDefault();
        setLoading(true)
        // submit.mutate(data);
        credRailApi.reconcile.upload({
            title: data.title,
            // @ts-ignore
            sourceFile: data?.sourceFile[0],
            // @ts-ignore
            targetFile: data?.targetFile[0],
            description: data.description
        } as IUpload).then((report)=> {
            setLoading(false)
            toast.success('Upload successful!')
            router.push(`/report/${report.id}`)
        }).catch(err => toast.error(extractError(err)))
    });
    useEffect(()=>{
        setPageTitle("Upload")
    }, [])
    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Upload Data</h2>
            </div>
            <form action="#" method="POST" onSubmit={onSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                            Name / Title
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="name"
                                type="text"
                                {...register('title')}
                                autoComplete="organization"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <DisplayError message={errors['title']?.message} />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                            Source file
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="source_file"
                                type="file"
                                {...register('sourceFile')}
                                autoComplete="organization"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <DisplayError message={errors['sourceFile']?.message} />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                            Target file
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="target_file"
                                type="file"
                                {...register('targetFile')}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <DisplayError message={errors['targetFile']?.message} />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                            Description
                        </label>
                        <div className="mt-2.5">
                          <textarea
                              id="message"
                              {...register('description')}
                              rows={4}
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              defaultValue={''}
                          />
                        </div>
                        <DisplayError message={errors['description']?.message} />
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {loading ? (<Loader />) : 'Upload'}
                    </button>
                </div>
            </form>
        </div>
    )
}
export default UploadComponent

const DisplayError = ({message}:{message?: string}) => {
    return message && <p className="text-sm text-red-400">{message}</p>
}