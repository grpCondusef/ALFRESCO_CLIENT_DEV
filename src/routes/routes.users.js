import { BasicLayout } from "../layouts/BasicLayout"
import { BlankLayout } from "../layouts/BlankLayout"
import ChangePassword from "../pages/ChangePassword/ChangePassword"
import CrearExpediente from "../pages/CrearExpediente/CrearExpediente"
import { Dashboard } from "../pages/Dashboard/Dashboard"
import {RecursosRevision} from "../pages/RecursosRevision/RecursosRevision"
import { Documents } from "../pages/Documents/Documents"
import EmptyExpedientes from "../pages/EmptyExpedientes/EmptyExpedientes"
import { Expedientes } from "../pages/Expedientes/Expedientes"
import { ExpedientesSearchResults } from "../pages/ExpedientesSearchResults/ExpedientesSearchResults"
import { Home } from "../pages/Home/Home"
import MassiveUpload from "../pages/MassiveUpload/MassiveUpload"
import { Menu } from "../pages/Menu/Menu"

const usersRoutes = [
    {
        path: '/',
        layout: BasicLayout,
        component: Home,
    },
    {
        path: 'menu/',
        layout: BasicLayout,
        component: Menu,
    },
    {
        path: 'cambiar-password',
        layout: BasicLayout,
        component: ChangePassword,
    },
    {
        path: 'expediente/documents/:expediente_id',
        layout: BasicLayout,
        component: Documents,
    },
    {
        path: '/search-results/:search/:page',
        layout: BasicLayout,
        component: ExpedientesSearchResults,
    },
    {
        path: 'expedientes-list/',
        layout: BasicLayout,
        component: Expedientes,
    },
    {
        path: 'agregar-expediente/',
        layout: BasicLayout,
        component: CrearExpediente,
    },
    {
        path: 'carga-masiva/',
        layout: BasicLayout,
        component: MassiveUpload,
    },
    {
        path: 'expediente/dashboard/',
        layout: BasicLayout,
        component: Dashboard,
    },
    {
        path: 'expediente/empty-expedientes/:area_id',
        layout: BlankLayout,
        component: EmptyExpedientes,
    },
    {
        path: 'recursos-revision', 
        layout: BasicLayout,
        component: RecursosRevision,
    },
]

export default usersRoutes