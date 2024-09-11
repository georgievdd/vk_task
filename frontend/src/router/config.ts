import PostsPage from "pages/posts";
import SigninPage from "pages/signin";
import SignupPage from "pages/signup";
import Wrapper from "pages/wrapper";
import { PageComponent, PageWrapper, Permission } from "types/page";

interface RouteConfig {
    component: PageComponent
    path: string
    wrapper?: PageWrapper
}

export const routes: RouteConfig[] = [
    {
        component: SigninPage,
        path: '/signin',
    },
    {
        component: SignupPage,
        path: '/signup',
    },
    {
        component: PostsPage,
        path: '/posts',
        wrapper: Wrapper
    },
    {
        component: PostsPage,
        path: '/',
        wrapper: Wrapper
    }
]

export const permissionfilter = (permission: Permission) => (route: RouteConfig) =>
    permission >= route.component.permission