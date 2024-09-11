import { useState } from "react";

export interface InputController {
    value: string,
    onChange: (e: any) => void
}


export default function useInput(defaultValue?: string): InputController {
    const [value, setValue] = useState(defaultValue || "")
    const onChange = (e: any) => {
        setValue(e.target.value)
    }
    return {
        value,
        onChange
    }
}