import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { routes, permissionfilter } from './config';
import { FC } from 'react';
import useAuth from 'hooks/use-auth';

export const Router: FC = () => {
    const {permission} = useAuth()
    return (
        <BrowserRouter>
            <Routes>
                {
                    routes
                    .filter(permissionfilter(permission))
                    .map(({path, component: Component, wrapper: Wrapper}) =>
                        <Route key={path} path={path} element={ Wrapper ?
                        <Wrapper><Component/></Wrapper> :
                        <Component/>}/>
                )
            }
            </Routes>
        </BrowserRouter>
    )
}