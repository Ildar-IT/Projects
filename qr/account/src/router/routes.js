import Vue from 'vue'
import Router from 'vue-router'

const LayoutMain = () => import('../components/layouts/layout-main.vue');
const Login = () => import('../components/login.vue');
const logURL = () => import('../components/logUrl.vue');
const LoginCode = () => import('../components/login-code.vue');

const Dashboard = () => import('../components/dashboard.vue');
const Polls = () => import('../components/polls.vue');
const PollPage = () => import('../components/poll-page.vue');

const PollPageEditCreate = () => import('../components/poll-page-edit-create.vue');

const Journal = () => import('../components/journal.vue');
const Templates = () => import('../components/templates.vue');
const Styles = () => import('../components/styles-download.vue');
const Formats = () => import('../components/formats-download.vue');
const Settings = () => import('../components/settings.vue');
const Support = () => import('../components/support.vue');

const Logout = () => import('../components/logout.vue');
const Privacy = () => import('../components/privacy.vue');

const Subscription = () => import('../components/subscription.vue');
const Tariffs = () => import('../components/tariffs.vue');
const PaymentSuccess = () => import('../components/payment-success.vue');
const PaymentFail = () => import('../components/payment-fail.vue');

const Error404 = () => import( '../components/error404.vue');
const Error500 = () => import('../components/error500.vue');

const UserAgreement = () => import('../components/user-agreement.vue');
const SubscriptionRules = () => import('../components/subscription-rules.vue');
const BankInfo = () => import('../components/bank-info.vue');

Vue.use(Router);

const routes = [
	{
		path: '/', component: LayoutMain, meta: {},
		children: [
			// { path: '/', name: 'home', component: Home, props: true, meta: {} },
			{
				path: '/login',
				name: 'login',
				component: Login,
				props: true,
				meta: {noMenu: true, noBlur: true, api: 'CommonController'}
			},
      { 
        path: '/logURL',
        props: true,
        name: 'logURL',
				component: logURL,
        //meta: {api: 'AuthEmailURLController', }
      },
			{
				path: '/login-code',
				name: 'login-code',
				component: LoginCode,
				props: true,
				meta: {noMenu: true, noBlur: true, api: 'CommonController'}
			},

			{
				path: '/',
				name: 'dashboard',
				component: Dashboard,
				props: true,
				meta: {group: 'dashboard', api: 'DashboardController'}
			},

			{
				path: '/polls',
				name: 'polls',
				component: Polls,
				props: true,
				meta: {group: 'polls', api: 'PollListController'}
			},
			{
				path: '/poll/:hash',
				name: 'poll-page',
				component: PollPage,
				props: true,
				meta: {group: 'polls', api: 'PollItemController'}
			},

			{
				path: '/poll/edit/:hash',
				name: 'poll-page-edit',
				component: PollPageEditCreate,
				props: true,
				meta: {group: 'polls', api: 'PollItemController'}
			},
			{
				path: '/poll-new',
				name: 'poll-page-new',
				component: PollPageEditCreate,
				props: true,
				meta: {group: 'polls', api: 'PollItemController'}
			},

			{
				path: '/journal',
				name: 'journal',
				component: Journal,
				props: true,
				meta: {group: 'journal', api: 'AnswerListController'}
			},
			{
				path: '/templates',
				name: 'templates',
				component: Templates,
				props: true,
				meta: {group: 'templates', api: 'TemplateListController'}
			},
			{
				path: '/styles/:type',
				name: 'styles',
				component: Styles,
				props: true,
				meta: {group: 'templates', api: 'TemplateListController'}
			},
      {
				path: '/formats/:type',
				name: 'formats',
				component: Formats,
				props: true,
				meta: {group: 'templates', api: 'TemplateListController'}
			},
			{path: '/settings', name: 'settings', component: Settings, props: true, meta: {api: 'SettingsController'}},
			{path: '/support', name: 'support', component: Support, props: true, meta: {api: 'CommonController'}},
			{
				path: '/subscription',
				name: 'subscription',
				component: Subscription,
				props: true,
				meta: {api: 'SubscriptionController'}
			},
			{
				path: '/subscription/success',
				name: 'payment-success',
				component: PaymentSuccess,
				props: true,
				meta: {api: 'PaymentController', query: {orderId:'InvId'}}
			},
			{
				path: '/subscription/fail',
				alias: '/subscription/error',
				name: 'payment-fail',
				component: PaymentFail,
				props: true,
				meta: {}
			},
			{
				path: '/logout',
				name: 'logout',
				component: Logout,
				props: true,
				meta: {api: 'LogoutController', method: 'POST', noMenu: true, noBlur: true}
			},

			{
				path: '/privacy',
				name: 'privacy',
				component: Privacy,
				props: true,
				meta: {api: 'CommonController', noMenu: true, noBlur: true}
			},
			{
				path: '/tariffs',
				name: 'tariffs',
				component: Tariffs,
				props: true,
				meta: {api: 'RestrictedController'}
			},
			{
				// аналог тарифов - но доступен без авторизации!
				path: '/pricing',
				name: 'pricing',
				component: Tariffs,
				props: true,
				meta: {api: 'CommonController', noMenu: true, noBlur: true}
			},
			{
				path: '/user-agreement',
				name: 'user-agreement',
				component: UserAgreement,
				props: true,
				meta: {api: 'CommonController', noMenu: true, noBlur: true}
			},
			{
				path: '/subscription-rules',
				name: 'subscription-rules',
				component: SubscriptionRules,
				props: true,
				meta: {api: 'CommonController', noMenu: true, noBlur: true}
			},

			{
				path: '/bank-info',
				name: 'bank-info',
				component: BankInfo,
				props: true,
				meta: {api: 'CommonController', noMenu: true, noBlur: true}
			},

			// {path: '/not-found', name: 'error404', component: Error404, meta: {api: 'CommonController'}},
			// {path: '*', redirect: {'name' : 'error404'}},
			{path: '/error500', name: 'error500', component: Error500, meta: {}},
			{path: '*', name: 'error404', component: Error404, meta: {}},
		]
	}
];

export default routes;
