let state = {
	// основной обхект ответа от БЕ
	response: {},

	// текущая сессия - выставляется после успешной авторизации (setSession)
	// TODO: по-хорошему, это должно переустанавливаться при каждом fetchPage
	session: {
		user: '',
		auth: null,
		validationCode: '',
	},
	isError: false,
	// данные из БЕ
	// общие для всех страниц
	common: {
		NAME: 'memostory',
		phone: '8 800 222 99 39',
		phoneLink: '88002229939',
		// phoneForLink: 'tel:+78124673274',
		email: 'cs@memostory.ru',
		address: ' ',
	},
	// индивидуальные для каждой страницы
	page: {
		home: {
			menuSections: [
				{title: 'Наши услуги', name: 'services', linkTo: '#services'},
				{title: 'Примеры работ', name: 'works', linkTo: '#examples'},
				{title: 'Тарифы', name: 'tariffs', linkTo: '#tariffs'},
				{title: 'О нас', name: 'about', linkTo: '#about'},
				{title: 'Отзывы', name: 'reviews', linkTo: '#reviews'},
			]
		}
	},
	// текущая страница
	currentPage: {},
	layoutSwiper: null,
	fullscreenSlider: null,


	coverImageState: false,  // false - cover image should disappear, true - cover image should appear
	coverImage: {
		url: null,
		params: {},
		withAppearing: false,
	},


	windowWidth: window.innerWidth,
	windowHeight: window.innerHeight,

	// isTabletMenuOpen: false,

	isMenuOpen: false,

	selectedServicesToBeCounted: [],
	avatarPreview: null,
	initials: null,
	isRouting: false, //
	transitionName: 'route',
	parentRoute: null,
	previousRoute: {},

	memories: [
		{
			ID: 1,
			NAME: 'Семёнов Павел Викторович',
			initials: 'Семёнов П. В.',
			photo: require("@/assets/images/old-man.jpg"),
			address: 'СПб, Красненькое кладбище, пр. Стачек, 98',
			placeNumber: 354,
			geolocation: [],
			passport: null,
			services: [
				{
					icon: 'clean',
					name: 'Уборка',
					price: 800,
					included: true,
					description: 'Возмущение плотности растягивает аллювий, хотя этот факт нуждается в дальнейшей тщательной экспериментальной проверке.'
				},
				{
					icon: 'flower',
					name: 'Озеленение',
					price: 1200,
					included: true,
					description: 'Возмущение плотности растягивает аллювий, хотя этот факт нуждается в дальнейшей тщательной экспериментальной проверке.'
				},
				{
					icon: 'repairs',
					name: 'Ремонт',
					price: 1800,
					included: true,
					description: 'Возмущение плотности растягивает аллювий, хотя этот факт нуждается в дальнейшей тщательной экспериментальной проверке.'
				},
				{
					icon: 'video-report',
					name: 'Видеоотчёт',
					price: 2000,
					included: false,
					description: 'Возмущение плотности растягивает аллювий, хотя этот факт нуждается в дальнейшей тщательной экспериментальной проверке.'
				}
			],
			serviceTotal: 3800,
			remarks: 'Покрасить изгородь в синий',
			lastReportDate: '05.10.2020, 12:41',
			isApproved: true,
			isCarried: true,
			reports: [
				{
					date: '05.10.2020',
					time: '12:41',
					rating: '',
					photosBefore: [
						{photo: require("@/assets/images/grave.jpg")},
						{photo: require("@/assets/images/grave.jpg")},
						{photo: require("@/assets/images/grave.jpg")},
						{photo: require("@/assets/images/grave.jpg")},
					],
					photosAfter: [
						{photo: require("@/assets/images/landscape.jpg")},
						{photo: require("@/assets/images/landscape.jpg")},
						{photo: require("@/assets/images/landscape.jpg")},
					]
				},
				{
					date: '09.09.2020',
					time: '10:15',
					rating: '',
					photosBefore: [
						{photo: require("@/assets/images/example-grave.jpg")},
						{photo: require("@/assets/images/grave.jpg")},
						{photo: require("@/assets/images/grave.jpg")},
					],
					photosAfter: [
						{photo: require("@/assets/images/landscape.jpg")},
						{photo: require("@/assets/images/landscape.jpg")},
					]
				},
				{
					date: '11.11.2020',
					time: '11:11',
					rating: '',
					photosBefore: [
						{photo: require("@/assets/images/example-after.jpg")},
						{photo: require("@/assets/images/grave.jpg")},
						{photo: require("@/assets/images/grave.jpg")},
					],
					photosAfter: [
						{photo: require("@/assets/images/old-man.jpg")},
						{photo: require("@/assets/images/landscape.jpg")},
					]
				}
			]
		},
		{
			ID: 2,
			NAME: 'Семёнова Ольга Сергеевна',
			initials: 'Семёнова О. С.',
			photo: require("@/assets/images/old-woman.jpg"),
			// photo: null,
			address: 'СПб, Красненькое кладбище, пр. Стачек, 98',
			placeNumber: 353,
			geolocation: [],
			passport: null,
			services: [
				{
					icon: 'clean',
					name: 'Уборка',
					price: 800,
					included: true,
					description: 'Возмущение плотности растягивает аллювий, хотя этот факт нуждается в дальнейшей тщательной экспериментальной проверке.'
				},
				{
					icon: 'flower',
					name: 'Озеленение',
					price: 1200,
					included: true,
					description: 'Возмущение плотности растягивает аллювий, хотя этот факт нуждается в дальнейшей тщательной экспериментальной проверке.'
				},
				{
					icon: 'repairs',
					name: 'Ремонт',
					price: 1800,
					included: false,
					description: 'Возмущение плотности растягивает аллювий, хотя этот факт нуждается в дальнейшей тщательной экспериментальной проверке.'
				},
				{
					icon: 'video-report',
					name: 'Видеоотчёт',
					price: 2000,
					included: false,
					description: 'Возмущение плотности растягивает аллювий, хотя этот факт нуждается в дальнейшей тщательной экспериментальной проверке.'
				}
			],
			serviceTotal: 2000,
			remarks: 'Посадить пионы',
			lastReportDate: "03.09.2020, 10:55",
			isApproved: false,
			isCarried: false,
			reports: [
				{
					date: '17.08.2020',
					time: '18:26',
					rating: '',
					photosBefore: [
						{photo: require("@/assets/images/example-grave1.jpg")},
						{photo: require("@/assets/images/grave.jpg")},
					],
					photosAfter: [
						{photo: require("@/assets/images/landscape.jpg")},
						{photo: require("@/assets/images/landscape.jpg")},
						{photo: require("@/assets/images/landscape.jpg")},
						{photo: require("@/assets/images/landscape.jpg")},
					]
				},
				{
					date: '20.10.2020',
					time: '08:06',
					rating: '',
					photosBefore: [
						{photo: require("@/assets/images/example-after2.jpg")},
						{photo: require("@/assets/images/grave.jpg")},
					],
					photosAfter: [
						{photo: require("@/assets/images/landscape.jpg")},
						{photo: require("@/assets/images/landscape.jpg")},
						{photo: require("@/assets/images/landscape.jpg")},
						{photo: require("@/assets/images/landscape.jpg")},
					]
				}
			]
		},

	]

};

export default state;
