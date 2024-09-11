import './styles.css'
import AuthPreview from 'components/auth-preview'
import UserPreview from 'components/navbar/user-preview'
const Navbar = () => {
    return (
        <div className='navbar-container'>
            <AuthPreview/>
            <UserPreview/>
        </div>
    )
}

export default Navbar
