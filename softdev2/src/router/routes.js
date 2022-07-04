import Vue from 'vue'
import Router from 'vue-router'


const LayoutMain = () => import("@/layouts/layout-main");
const Home = () => import("@/views/Home");
const Services = () => import("@/views/Services");
const AboutUs = () => import("@/views/About-us");
const ServiceItem = () => import("@/views/ServiceItem");
const Projects = () => import("@/views/Projects");
const ProjectGroupItem = () => import("@/views/ProjectGroupItem");
const ProjectItem = () => import("@/views/ProjectItem");


const OurTeam = () => import("@/views/Our-team-page");
const Benefits = () => import("@/views/Benefits");


const Contacts = () => import("@/views/Contacts");
const LayoutError = () => import("@/layouts/layout-error");
const Error404 = () => import("@/views/Error404");
const Error500 = () => import("@/views/Error500");


const Testimonials = () => import("@/views/Testimonials");
const LayoutTestimonials = () => import("@/layouts/layout-testimonials");

Vue.use(Router);

const routes = [
    {
        path: '/', component: LayoutMain,
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home,
                meta: {api: "/api/page/home"}
            },
            {
                path: '/services',
                name: 'Services',
                component: Services,
                meta: {api: "/api/page/services"}
            },
            {
                path: '/services/:code',
                name: 'ServiceItem',
                props: true,
                component: ServiceItem,
                meta: {api: "/api/page/service-item"}
            },
            {
                path: '/projects',
                name: 'Projects',
                component: Projects,
                meta: {api: "/api/page/project-groups"}
            },
            {
                path: '/projects/:code',
                name: 'ProjectGroupItem',
                props: true,
                component: ProjectGroupItem,
                meta: {api: "/api/page/project-group-item"}
            },

            {
                path: '/project/:code/:projectcode',
                name: 'ProjectItem',
                props: true,
                component: ProjectItem,
                meta: {api: "/api/page/project-item"}
            },
            {
                path: '/about-us',
                name: 'About-us',
                component: AboutUs,
                meta: {api: "/api/page/about-us"}
            },
            {
                path: '/about-us/our-team',
                name: 'OurTeam',
                component: OurTeam,
            },
            {
                path: '/benefits',
                name: 'Benefits',
                component: Benefits,
                meta: {api: "/api/page/benefits"}
            },
            {
                path: '/contacts',
                name: 'Contacts',
                component: Contacts,
                meta: {api: "/api/page/contacts"}
            },

        ]
    },
    {
        path: '/', component: LayoutTestimonials,
        children: [
            {
                path: '/about-us/testimonials',
                name: 'testimonials',
                component: Testimonials,
            },
        ]
    },
    {
        path: '/', component: LayoutError,
        children: [
            {
                path: '/error404',
                name: 'Error404',
                component: Error404,
                meta: {api: "/api/page/not-found-error"}
            },
            {
                path: '/error500',
                name: 'Error500',
                component: Error500,
            },
        ]
    },
    {
        path: '/*',
        name: 'Unknown',
        component: Error404,
        meta: {api: "/api/page/not-found-error"}
    },
];
export default routes










