import './styles.css'
import { FC } from "react"

const Input: FC<React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    icon?: any
}>
= (props) => {
    return (
        <div className="input-container">
            {props.icon &&
                <props.icon/>
            }
            <input {...props}/>
        </div>
    )
}

export default Input