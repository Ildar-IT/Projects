import Vue from 'vue'
import Router from 'vue-router'

const LayoutMain = () => import('../components/layouts/layout-main.vue');

const LayoutBase = () => import('../components/layouts/layout-base.vue');
const Home = () => import('../components/home.vue');
const Hello = () => import('../components/hello.vue');
const Question = () => import('../components/question.vue');
const QuestionFinish = () => import('../components/question-finish.vue');
const Present = () => import('../components/present.vue');
//const Review = () => import('../components/review.vue');
//const ReviewFinish = () => import('../components/review-finish.vue');
//const ReviewFinish2 = () => import('../components/review-finish.vue');
const Feedback = () => import('../components/feedback.vue');
const FeedbackLinks = () => import('../components/feedback-links');

const FeedbackFinish = () => import('../components/feedback-finish.vue');
const FeedbackFinish2 = () => import('../components/feedback-finish2.vue');

const Suspended = () => import('../components/suspended.vue');
const Page404 = () => import('../components/page404.vue');
const Page500 = () => import('../components/page500.vue');

Vue.use(Router);

const routes = [
    {
        path: '/', component: LayoutBase,
        children: [
            // { path: '/error404',  name: 'error404', component: Error404, props: true, meta: {   } }, //api: 'HomeController'
            {path: '/', name: 'hello', component: Hello, meta: {api: 'ReviewHomeController'} },
            {path: '/404', name: 'page404', component: Page404},
            {path: '/500', name: 'page500', component: Page500},
            {path: '/suspended', name: 'suspended', component: Suspended},
        ]
    },
    {
        path: '/:hash', component: LayoutMain,
        children: [
            // { path: '/error404',  name: 'error404', component: Error404, props: true, meta: {   } }, //api: 'HomeController'
            //{ path: '/:hash', name: 'home', component: Home, props: true, meta: { api: 'ReviewController' } },
            {path: '/:hash', name: 'question', component: Question, props: true, meta: {api: 'ReviewController'}},
            {path: '/:hash/question/:id', name: 'question', component: Question,  props: true,  meta: {api: 'ReviewController'}},
            {
                path: '/:hash/question-finish',
                name: 'question-finish',
                component: QuestionFinish,
                props: true,
                meta: {api: 'ReviewValidationController'}
            },
            {
                path: '/:hash/present',
                name: 'present',
                component: Present,
                props: true,
                meta: {api: 'ReviewValidationController'}
            },
            {
                path: '/:hash/feedback',
                name: 'feedback',
                component: Feedback,
                props: true,
                meta: {api: 'ReviewValidationController'}
            },
            {
                path: '/:hash/feedback-links',
                name: 'feedback-links',
                component: FeedbackLinks,
                props: true,
                meta: {api: 'ReviewValidationController'}
            },
            {
                path: '/:hash/feedback-finish-thanks',
                name: 'feedback-finish',
                component: FeedbackFinish,
                props: true,
                meta: {api: 'ReviewStatsController'}
            },
            {
                path: '/:hash/feedback-finish',
                name: 'feedback-finish2',
                component: FeedbackFinish2,
                props: true,
                meta: {api: 'ReviewStatsController'}
            },
        ]
    },


];

export default routes;
