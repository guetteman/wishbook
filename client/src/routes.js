import Home from './pages/Home';
import CreateBook from './pages/Books/Create';
import {authGuard} from "./auth/authGuard";

const routes = [
    {path: '/', component: Home},
    {path: '/books/create', component: CreateBook, beforeEnter: authGuard}
];

export default routes;