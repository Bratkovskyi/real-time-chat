import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routers';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';

const AppRouter = () => {
    
    const user = false
    
    return user ?
        (
            <Routes>
                {privateRoutes.map(({path, element}) => 
                    <Route path={path} element={element}/>
                )}
                <Route 
                    path="*" 
                    element={<Navigate to={CHAT_ROUTE} replace/>} />
            </Routes>
        )
        :
        (
            <Routes>
                {publicRoutes.map(({path, element}) => 
                    <Route path={path} element={element}/>
                    // console.log(element())
                )}
                <Route 
                    path="*" 
                    element={<Navigate to={LOGIN_ROUTE} replace/>} />
            </Routes>
        )
}

export default AppRouter;
