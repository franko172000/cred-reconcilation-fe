import {IRecord} from "@/interfaces/records";

const ReconciledDataTable = ({records}: {records?: IRecord[]}) => {
    return (
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
                    Name
                </th>
                <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-medium tracking-wide text-gray-500"
                >
                    Account number
                </th>
                <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-medium tracking-wide text-gray-500"
                >
                    Transaction Date
                </th>
                <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-medium tracking-wide text-gray-500"
                >
                    Balance
                </th>
                <th
                    scope="col"
                    className="px-3 py-3 text-left text-sm font-medium tracking-wide text-gray-500"
                >
                    Description
                </th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
            {records?.map((record, index) => (
                <tr key={index}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.id}</td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {record.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.account_number}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.transaction_date}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.balance}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.description}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
export default ReconciledDataTable