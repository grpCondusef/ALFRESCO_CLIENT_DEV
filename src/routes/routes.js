
import usersRoutes from './routes.users'
import adminsRoutes from './routes.admins'
import { Error404 } from '../layouts/Error404'
import { BlankLayout } from '../layouts/BlankLayout'

const routes = [...adminsRoutes, ...usersRoutes,
{
    path: '*',
    layout: BlankLayout,
    component: Error404
},
]

export default routes