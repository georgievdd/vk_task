import WithPermissionsCheck from "components/helpers"
import { Link } from "react-router-dom"
import { PageComponent, Permission } from "types/page"

const AuthPreview: PageComponent = () => {
    return (
        <div className='preview-container'>
            <div className='item shadow'>
                <Link to={'/signin'} className="link-default">Signin</Link>
            </div>
            <div className='item shadow'>
                <Link to={'/signup'} className="link-default">Signup</Link>
            </div>
        </div>
    )
}

AuthPreview.permission = Permission.UNAUTHORIZED_ONLY

export default WithPermissionsCheck(AuthPreview)