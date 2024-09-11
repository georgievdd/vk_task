import useAuth from "hooks/use-auth";
import { PageComponent, Permission } from "types/page";

const WithPermissionsCheck = (Component: PageComponent) => {
    const ReturnComponent: React.FC = (props) => {
        const { permission } = useAuth();
        if (Component.permission === Permission.UNAUTHORIZED_ONLY 
            && permission === Permission.ALL ||
            permission >= Component.permission) {
            return <Component {...props} />
        }
        return <></>
    }
    return ReturnComponent
}

export default WithPermissionsCheck