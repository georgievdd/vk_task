import WithPermissionsCheck from 'components/helpers';
import './styles.css'
import useAuth from "hooks/use-auth";
import { FaSignOutAlt, FaUserShield, FaPlus } from 'react-icons/fa'
import authService from 'service/auth_service';
import { PageComponent, Permission } from 'types/page';
import { Link } from 'react-router-dom';

const UserPreview: PageComponent = () => {
    const user = useAuth()
    return (
        <div className='preview-container'>
            {user.isAdmin &&
            <Link to='/post/new' className='link-default'>
                <div className='item shadow pointer post'>
                    <FaPlus/>
                    <p>Create post</p>
                </div>
            </Link>}
            <div className='item shadow'>
                <p className='text'>{user.email}</p>
            </div>
            {user.isAdmin &&
            <div className='item shadow admin-icon'>
                <FaUserShield/>
            </div>}
            <div className='item shadow pointer' onClick={authService.signout}>
                <FaSignOutAlt/>
            </div>
        </div>
    )
}

UserPreview.permission = Permission.AUTHORIZED

export default WithPermissionsCheck(UserPreview)