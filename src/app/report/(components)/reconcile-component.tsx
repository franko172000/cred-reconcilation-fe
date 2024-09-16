import {useState} from "react";
import Discrepancies from "@/app/report/(components)/discrepancies";
import ReconciledDataTable from "@/app/report/(components)/reconciled-data-table";
import {useRecordStore} from "@/store/record";


function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
interface Tab { name: string, current: boolean, slug: string}
const ReconcileComponent = () => {
    const {uploaded} = useRecordStore()
    const [currentTab, setCurrentTab] = useState<string>("reconciled")
    const [tabs, setTabs] = useState<Tab[]>([
        { name: 'Reconciled', current: true, slug: 'reconciled' },
        { name: 'Missing from source', current: false, slug: 'missing-source' },
        { name: 'Missing from target', current: false, slug: 'missing-target' },
        { name: 'Discrepancies', current: false, slug: 'discrepancies' },
    ])
    const handleSelectedTab = (selectedTab: Tab, index: number) => {
        //setTabs(tabs => [...tabs.map(tab => )])
        const updatedTabs: Tab[] = tabs.map(tab => {
            tab.current = false;
            return tab
        })
        updatedTabs.splice(index,1,{
            ...selectedTab,
            current: true
        })
        setTabs(updatedTabs)
        setCurrentTab(selectedTab.slug)
    }
    return (
        <div>
            <div className="block">
                <div className="border-b border-gray-200">
                    <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                        {tabs.map((tab, index) => (
                            <span
                                key={tab.name}
                                aria-current={tab.current ? 'page' : undefined}
                                className={classNames(
                                    tab.current
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium cursor-pointer',
                                )}
                                onClick={() => handleSelectedTab(tab, index)}
                            >
                                {tab.name}
                            </span>
                        ))}
                    </nav>
                </div>

                <div className="container">
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                {
                                    currentTab === 'reconciled' && (
                                        <ReconciledDataTable records={uploaded?.record_set} />
                                    )
                                }
                                {
                                    currentTab === 'missing-source' && (
                                        <ReconciledDataTable records={uploaded?.missing_in_source} />
                                    )
                                }
                                {
                                    currentTab === 'missing-target' && (
                                        <ReconciledDataTable records={uploaded?.missing_in_target} />
                                    )
                                }
                                {
                                    currentTab === 'discrepancies' && (
                                        < Discrepancies data={uploaded?.discrepancies} />

                                    )
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default ReconcileComponent