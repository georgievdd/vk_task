import Navbar from "components/navbar"
import { PageWrapper } from "types/page"

const Wrapper: PageWrapper = ({children}) => {
    return (
        <div>
            <Navbar/>
            {children}
        </div>
    )
}

export default Wrapper