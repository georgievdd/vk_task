import MutableTextForm from "components/mutable-text-form"
import useAuth from "hooks/use-auth"
import { FC } from "react"

interface Props {
    id: string
    initText: string
    onChange: (text: string) => void
}

const PermissionText: FC<Props> = ({id, ...other}) => {
    const user = useAuth()
    const isMy = user.id === id
    return isMy ?
        <MutableTextForm {...other}/> :
        <div className='text'>
            {other.initText}
        </div>
}


export default PermissionText