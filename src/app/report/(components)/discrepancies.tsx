import {IRecordDiscrepancies} from "@/interfaces/records";
const Discrepancies = ({data}: {data?: IRecordDiscrepancies[]}) => {
    return (
        <>
            {
                data?.map(dep => (
                    <div className="overflow-hidden rounded-lg bg-white shadow p-5">
                        <div className="text-sm font-medium leading-6 text-gray-900">Record Id: {dep.id}</div>
                        <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                            {Object.keys(dep.differences).map((key, index) => (
                                <li key={index} className="overflow-hidden rounded-xl border border-gray-200">
                                    <div className="flex flex-col gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                        <div className="text-sm font-medium leading-6 text-gray-900">Column
                                            name: {key}</div>
                                    </div>
                                    <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                                        <div className="flex justify-between gap-x-4 py-3">
                                            <dt className="text-gray-500">Source</dt>
                                            <dd className="text-gray-700">
                                                <div
                                                    className="font-medium selection:bg-purple-300 selection:text-purple-900">{dep.differences[key].source}</div>
                                            </dd>
                                        </div>
                                        <div className="flex justify-between gap-x-4 py-3">
                                        <dt className="text-gray-500">Target</dt>
                                            <dd className="flex items-start gap-x-2">
                                                <div
                                                    className="font-medium bg-red-500 selection:bg-purple-300 selection:text-purple-900">{dep.differences[key].target}</div>

                                            </dd>
                                        </div>
                                    </dl>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            }
        </>
    )
}
export default Discrepancies