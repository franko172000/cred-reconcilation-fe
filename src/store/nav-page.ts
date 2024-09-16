import {create} from "zustand";

type NavPageStateType = {
    pageTitle: string
}

const navState: NavPageStateType = {
    pageTitle: '',
}

type NavPageAction = {
    setPageTitle: (title: string)=>void;
}

export const useNavPageStore = create<NavPageStateType & NavPageAction>((set) => ({
    ...navState,
    setPageTitle: (title) => set(()=> ({pageTitle: title}))
}))