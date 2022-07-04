import Vue from 'vue'
import Router from 'vue-router'


/*const FlavoursOriginal = () => import("../views/flavours/flavours-original");
const FlavoursCategory = () => import("../views/flavours/flavours-category");
const Praline = () => import("../views/flavours/praline");
const BoxType = () => import("../views/shop/box/box-type");
const MyBox = () => import("../views/shop/box/my-box");
const BoxLoran = () => import("../views/shop/box/box-loran");
const BoxLoran2 = () => import("../views/shop/box/box-loran2");*/

Vue.use(Router);

const routes = [
    {
        path: '/', component: () => import("../layout/layout-main"),
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import("../views/Home"),
                meta: {api: "HomeController"}
            },
            {
                path: '/#story',
                name: 'home-story',
                component: () => import("../views/Home"),
                meta: {api: 'HomeController', hash:'story'}
            },
            {
                path: '/#flavours',
                name: 'home-flavours',
                component: () => import("../views/Home"),
                meta: {api: 'HomeController', hash:'flavours'}
            },
            {
                path: '/#special',
                name: 'home-special',
                component: () => import("../views/Home"),
                meta: {api: 'HomeController', hash:'special'}
            },
            {
                path: '/#stores',
                name: 'home-stores',
                component: () => import("../views/Home"),
                meta: {api: 'HomeController', hash:'stores'}
            },
            {
                path: '/#partnership',
                name: 'home-partnership',
                component: () => import("../views/Home"),
                meta: {api: 'HomeController', hash:'partnership'}
            },
            {
                path: '/#contacts',
                name: 'home-contacts',
                component: () => import("../views/Home"),
                meta: {api: 'HomeController', hash:'contacts'}
            },

            {
                path: '/shop',
                name: 'shop',
                component: () => import("../views/Shop"),
                meta: {api: "CatalogController"}
                /*children: [

                    {
                        path: '/shop',
                        name: 'praline-category',
                        component: PralineCategory,
                        meta: {isPralineHeader: true},
                        props: {
                            isBgShow: true
                        }

                    },
                    {
                        path: '/shop/original',
                        name: 'original-pralines',
                        component: OriginalPralines,

                    },
                    {
                        path: '/shop/box',
                        name: 'box-type',
                        component: BoxType,
                    },
                    {
                        path: '/shop/box/my',
                        name: 'my-box',
                        component: MyBox,
                    },
                    {
                        path: '/shop/box/Laurent',
                        name: 'box-loran',
                        component: BoxLoran,
                    },
                    {
                        path: '/shop/box/Laurent2',
                        name: 'box-loran2',
                        component: BoxLoran2,
                    }
                ]*/
            },
            {
                path: '/shop/:code',
                component: () => import("../layout/layout-category"),
                children: [
                    {
                        path: '/shop/:code',
                        name: 'category',
                        props: true,
                        component: () => import("../views/Category"),
                        meta: {api: "CategoryController"}
                    },
                    {
                        path: '/shop/:sectionCode/:code',
                        name: 'product',
                        props: true,
                        component: () => import("../views/Product"),
                        meta: {api: "ProductController"}
                    },
                    {
                        path: '/shop/:sectionCode/:code/:type',
                        name: 'product-flavours',
                        props: true,
                        component: () => import("../views/ProductFlavours"),
                        meta: {api: "ProductController"}
                    },
                ]
            },


            /*{
                path: '/flavours',
                name: 'flavours',
                component: () => import("../views/Flavours"),
                children: [
                    {
                        path: '/flavours',
                        name: 'flavours-category',
                        component: FlavoursCategory,
                    },
                    {
                        path: '/flavours/original',
                        name: 'flavours-original',
                        component: FlavoursOriginal,
                    },
                    {
                        path: '/flavours/original/praline',
                        name: 'praline',
                        component: Praline,
                    },
                ]
            },*/

            {
                path: '/basket',
                name: 'basket',
                component: () => import("../views/Basket"),
            },
            {
                path: '/policy',
                name: 'policy',
                component: () => import("../views/Policy"),
            },
            {
                path: '/error404',
                name: 'error404',
                component: () => import("../views/Error404"),
            },
            {
                path: '/error500',
                name: 'error500',
                component: () => import("../views/Error500"),

            },
            {
                path: '/under-construction',
                name: 'under',
                component: () => import("../views/UnderConstruction"),
            },
            {
                path: '*',
                //name: 'error404',
                component: () => import("../views/Error404"),
            },

        ]
    }
];
export default routes;