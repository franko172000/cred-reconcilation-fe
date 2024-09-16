import {useRecordStore} from "@/store/record";
import Link from "next/link";

const UploadedComponent = () => {
    const {uploadedList} = useRecordStore()
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Uploaded records</h1>

                </div>

            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3 pl-4 pr-3 text-left text-sm font-medium tracking-wide text-gray-500 sm:pl-0"
                                >
                                    Id
                                </th>
                                <th
                                    scope="col"
                                    className="py-3 pl-4 pr-3 text-left text-sm font-medium tracking-wide text-gray-500 sm:pl-0"
                                >
                                    Upload name
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-left text-sm font-medium tracking-wide text-gray-500"
                                >
                                    Source file
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-left text-sm font-medium tracking-wide text-gray-500"
                                >
                                    Target file
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-left text-sm font-medium tracking-wide text-gray-500"
                                >
                                    Missing in target
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-left text-sm font-medium tracking-wide text-gray-500"
                                >
                                    Missing in source
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-left text-sm font-medium tracking-wide text-gray-500"
                                >
                                    Discrepancies
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-left text-sm font-medium tracking-wide text-gray-500"
                                >
                                    Total records
                                </th>
                                <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">View</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {uploadedList.map((record, index) => (
                                <tr key={index}>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.id}</td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        {record.title}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.source_file}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.target_file}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.missing_in_source?.length}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.missing_in_target?.length}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.discrepancies?.length}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record?.record_count}</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <Link href={`/report/${record.id}`} className="text-indigo-600 hover:text-indigo-900">
                                            View<span className="sr-only">, {record.title}</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UploadedComponent