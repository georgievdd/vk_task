import { useAppSelector } from "hooks";
import { Permission } from "types/page";

export default function useAuth() {
    const user = useAppSelector(state => state.auth)
    let permission: Permission
    if (user.isAdmin) {
        permission = Permission.ADMIN
    } else if (!!user.id) {
        permission = Permission.AUTHORIZED
    } else {
        permission = Permission.ALL
    }

    return {
        ...user,
        permission
    }
}