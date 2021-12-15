import React from 'react'
import Loadable from 'react-loadable';
import { Route, Link, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
// import Header from '@user/components/Header';
// import Footer from '@user/components/Footer';
import RouterWithPaths from '@components/RouterWithPaths';
function Loading() {
    return <div></div>;
}
export default function index(props) {
    const routers = [
        {
            path: ["/print/:id"],
            component: Loadable({
                loader: () => import("@admin/containers/report/detail/print"),
                loading: Loading
            })
        },
        {
            path: ["/print-the-khach"],
            component: Loadable({
                loader: () => import("@admin/containers/medicalDeclaration/PrintTheKhach"),
                loading: Loading
            })
        },
        {
            path: ["/lich-su-check-in"],
            component: Loadable({
                loader: () => import("@user/containers/CheckInHistory"),
                loading: Loading
            })
        },
    ]
    return (
        <div>
            {/* <Header /> */}
            <Switch>
                {
                    routers.map((route, key) => {
                        if (route.component)
                            return <RouterWithPaths exact key={key}
                                path={route.path}
                                render={props => {
                                    return <route.component {...props} />
                                }} />
                        return null;
                    })
                }
            </Switch>
            {/* <Footer /> */}
        </div>
    )
}
