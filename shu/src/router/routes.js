import Vue from 'vue'
import VueRouter from "vue-router";

const LayoutMain = () => import ('../layout/layout-main');
const LayoutError = () => import ('../layout/layout-error');
//const SetFilter = () => import('../components/set-filter')

const Home = () => import('../views/Home.vue');
const Directions = () => import('../views/directions');
const Direction = () => import('../views/direction');
const About = () => import('../views/about');
const Shops = () => import('../views/shops');
const Product = () => import('../components/product');
const ProductPage = () => import('../views/product-page');
const Page404 = () => import('../views/404');
const Page500 = () => import('../views/500');
const Policy = () => import('../views/policy')

Vue.use(VueRouter)

const routes = [
    {
        path: '/', component: LayoutMain,
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home,
                meta: {api: 'HomeController'}
            },
            {
                path: '/directions/:dir',
                name: 'Direction',
                props: true,
                component: Direction,
                meta: {api: "ProductListController"}
            },
            {
                path: '/product/:code',
                name: 'ProductPage',
                props: true,
                component: ProductPage,
                meta: {api: "ProductItemController"}
            },
            {
                path: '/about',
                name: 'About',
                component: About,
                meta: {api: "AboutController"}
            },
            {
                path: '/shops',
                name: 'Shops',
                component: Shops,
                meta: {api: 'ShopListController'}
            },
            {
                path: '/policy',
                name: 'policy',
                component: Policy,
                meta: {api: 'HomeController'}
            },
            {
                path: '/#new',
                name: 'HomeNewProducts',
                hash: 'new',
                component: Home,
                meta: {api: 'HomeController', hash:'new'}
            },
        ]
    },
    {
        path: '/404', component: LayoutError,
        children: [
            {
                path: '/404',
                name: '404',
                component: Page404,
                meta: {api: 'Error404Controller'}
            },
            {
                path: '/500',
                name: '500',
                component: Page500,
                meta: {api: 'Error500Controller'}
            }
        ]
    },
];

export default routes;