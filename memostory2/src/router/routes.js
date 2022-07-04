import Vue from 'vue'
import Router from 'vue-router'

const LayoutLogin = () => import('../layouts/layout-login');
const LayoutAccount = () => import('../layouts/layout-account.vue');
const LayoutManager = () => import('../layouts/layout-manager.vue');
const LayoutMain = () => import('../layouts/layout-main.vue');

const Page404 = () => import('../components/error404.vue');
const Page500 = () => import('../components/error500.vue');

const Requisites = () => import('../components/requisites.vue');
const TermsOfUse = () => import('../components/terms-of-use.vue');
const ConfidentialityPolicy = () => import('../components/confidentiality-policy.vue');
const PaymentTerms = () => import('../components/payment-terms.vue');

//Login pages
const Login = () => import('../components/login/login.vue');
const Registration = () => import('../components/login/registration.vue');
const LoginCode = () => import('../components/login/login-code.vue');
const LogOut = () => import('../components/login/logout.vue');
const Verify = () => import('../components/login/verify.vue');

//Account pages
const Reports = () => import('../components/account/reports.vue');
const MemoryPlaces = () => import('../components/account/memory-places.vue');
const AddMemoryPlace = () => import('../components/account/add-place.vue');
const Balance = () => import('../components/account/balance.vue');
const MyAccount = () => import('../components/account/my-account.vue');
const Settings = () => import('../components/account/settings.vue');

const PaymentSuccess = () => import('../components/payment-success.vue');
const PaymentFail = () => import('../components/payment-fail.vue');

//Manager pages
const ManagerAccount = () => import('../components/manager/manager-account');
const ManagerObject = () => import('../components/manager/manager-object');
const ReportAccepted = () => import('../components/report-accepted');

//TODO: Проверить, нужны ли константы ниже
const Reviews = () => import('../components/home/reviews.vue');
const Tariffs = () => import('../components/home/tariffs.vue');
const Services = () => import('../components/home/services.vue');
const CareExamples = () => import('../components/home/examples.vue');
const PrivacyPolicy = () => import('../components/privacy-policy.vue');

Vue.use(Router);

const routes = [
	{
		path: '/worker', component: LayoutManager,
		children: [
			{
				path: '/report-accepted',
				name: 'report-accepted',
				component: ReportAccepted,
				props: true,
				meta: {menuGroup: 'manager', noMenu: true, managerHeader: true,}
			},
			{
				path: '/worker',
				name: 'manager-account',
				component: ManagerAccount,
				props: true,
				meta: {menuGroup: 'manager', noMenu: true, managerHeader: true,}
			}, //api: 'CommonController'
			{
				path: '/worker/report/:WORKER_LINK_HASH',
				name: 'manager-object',
				component: ManagerObject,
				props: true,
				meta: {menuGroup: 'manager', noMenu: true, managerHeader: true, api: 'ReportItemController'}
			}, //api: 'CommonController'
		]
	},
	{
		path: '/account', component: LayoutAccount,
		children: [
			//Error pages
			// {path: '*', name: 'error404', component: Page404, props: true, meta: {menuGroup: 'account', api: 'CommonController'}},
			// {path: '/500', name: 'error500', component: Page500, props: true, meta: {menuGroup: 'account', api: 'CommonController'}},
			//Pages
			{
				path: '/account/reports',
				name: 'reports',
				component: Reports,
				props: true,
				meta: {menuGroup: 'account', api: 'ReportListController'}
			}, //api: 'CommonController'
			/*{
				path: '/account/reports/:reportId',
				name: 'reports',
				component: Reports,
				props: true,
				meta: {menuGroup: 'account', api: 'ReportListController'}
			}*/, //api: 'CommonController'
			{
				path: '/account',
				name: 'memory-places',
				component: MemoryPlaces,
				props: true,
				meta: {menuGroup: 'account', api: 'PlaceListController'}
			}, //api: 'CommonController'
			{
				path: '/account/add-place',
				name: 'add-memory-place',
				component: AddMemoryPlace,
				props: true,
				meta: {menuGroup: 'account', api: 'ReportListController'}
			}, //api: 'CommonController'
			{
				path: '/account/balance',
				name: 'balance',
				component: Balance,
				props: true,
				meta: {menuGroup: 'account', api: 'SubscriptionController'}
			}, //api: 'CommonController'
			{
				path: '/account/my-account',
				name: 'my-account',
				component: MyAccount,
				props: true,
				meta: {menuGroup: 'account', api: 'ProfileController'}
			}, //api: 'CommonController'
			// {path: '/settings', name:'settings', component: Settings, props: true, meta: {menuGroup: 'account'}},
			{
				path: '/account/settings/:ID',
				name: 'settings',
				component: Settings,
				props: true,
				meta: {menuGroup: 'account', api: 'PlaceItemController', isChild: true}
			}, //, api: 'CommonController'
			{
				path: '/verify',
				name: 'verify',
				component: Verify, props: true,
				// meta: {menuGroup: 'login', noMenu: true, api: 'CommonController'},
				meta: {menuGroup: 'account', api: 'CommonController'}, //todo разобраться почему не подсвечивает
			},
			{
				path: '/order/result/ok',
				name: 'payment-success',
				component: PaymentSuccess,
				props: true,
				meta: {api: 'HomeController'}
			},
			{
				path: '/order/result/error',
				name: 'payment-fail',
				component: PaymentFail,
				props: true,
				meta: {api: 'HomeController'}
			},
		]
	},

	{
		path: '/login', component: LayoutLogin,
		children: [
			//Account pages
			{
				path: '/login',
				name: 'login',
				component: Login, props: true,
				// meta: {menuGroup: 'login', noMenu: true, api: 'CommonController'},
				meta: {menuGroup: 'login', noMenu: true, api: 'CommonController'},
			},
			{
				path: '/registration',
				name: 'registration',
				component: Registration, props: true,
				// meta: {menuGroup: 'login', noMenu: true, api: 'CommonController'},
				meta: {menuGroup: 'login', noMenu: true, api: 'CommonController'},
			},
			{
				path: '/login-code',
				name: 'login-code',
				component: LoginCode, props: true,
				// meta: {menuGroup: 'login', noMenu: true, api: 'CommonController'},
				meta: {menuGroup: 'login', noMenu: true, api: 'CommonController'},
			},
			{
				path: '/logout',
				name: 'logout',
				component: LogOut, props: true,
				meta: {menuGroup: 'login', noMenu: true, api: 'LogoutController', method: 'POST'},
			},
		]
	},
	{
		path: '/', component: LayoutMain,
		children: [
			{
				path: '/',
				name: 'home',
				component: () => import('../components/home.vue'),
				props: true,
				meta: {menuGroup: 'home', hideInApp: true, api: 'HomeController'}
			},
			{
				path: 'privacy-policy',
				name: 'privacy-policy',
				component: ConfidentialityPolicy,
				props: true,
				meta: {menuGroup: 'home', api: 'ContentController'}
			},
			{
				path: 'requisites',
				name: 'requisites',
				component: Requisites,
				props: true,
				meta: {menuGroup: 'home', api: 'ContentController'}
			},
			{
				path: 'payment-terms',
				name: 'payment-terms',
				component: PaymentTerms,
				props: true,
				meta: {menuGroup: 'home', api: 'ContentController'}
			},
			{
				path: 'terms-of-use',
				name: 'terms-of-use',
				component: TermsOfUse,
				props: true,
				meta: {menuGroup: 'home', api: 'ContentController'}
			},
			/*{
				path: 'tariffs',
				name: 'tariffs',
				component: Tariffs,
				props: true,
				meta: {menuGroup: 'home', api: 'HomeController'}
			}, //api: 'HomeController'
			{
				path: 'reviews',
				name: 'reviews',
				component: Reviews,
				props: true,
				meta: {menuGroup: 'reviews'}
			}, //api: 'HomeController'*/


			//Error pages
			// {path: '404', name: 'error404', component: Page404, props: true, meta: {menuGroup: 'home', api: 'CommonController'}},
			{
				path: '500',
				name: 'error500',
				component: Page500,
				props: true,
				meta: {menuGroup: 'home'}
			},
			{path: '*', name: 'error404', component: Page404},

		]
	}
];

export default routes;
