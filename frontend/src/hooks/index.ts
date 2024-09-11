import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export interface HttpMethodController<T> {
    data: T | null,
    isLoading: boolean
    _setData: React.Dispatch<React.SetStateAction<T | null>>
}