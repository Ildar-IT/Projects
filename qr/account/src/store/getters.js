import config from "../config";

const getters = {

    page(state) {
        return state.page;
    },

    windowHeight(state) {
        return state.windowHeight;
    },
    /*
    * isWindowXS работает только для моб экрана, остальные геттеры по нарастанию
    * */
    isWindowXS(state) {
        return state.windowWidth < config.WIDTH_SM;
    },
    isWindowSM(state) {
        return state.windowWidth >= config.WIDTH_SM;
    },
    isWindowMD(state) {
        return state.windowWidth >= config.WIDTH_MD;
    },
    isWindowLG(state) {
        return state.windowWidth >= config.WIDTH_LG;
    },
    isWindowXL(state) {
        return state.windowWidth >= config.WIDTH_XL;
    },
    defaultPeriod(state) {
        return config.DEFAULT_PERIOD;
    },
    isPremium(state) {
        return state.session?.user?.TARIFF?.PRICE > 0;
    },
    tariff(state) {
        return state.session?.user?.TARIFF;
    },
    tariffs(state) {
        return state.common?.tariffs;

        /*return [
            {
                ID: 1,
                NAME: 'Бесплатный',
                type: 'standard',
                image: require('@/assets/standard-logo.png'),
                btn: 'Тариф по умолчанию',
                descr: 'Необходимый минимум для быстрого старта — ограниченная подписка с лимитированным количеством возможностей',
                list: {
                    title: 'Бесплатно',
                    items: [
                        {icon: 'alert-circle', text: "<strong>1</strong> опрос"},
                        {icon: 'alert-circle', text: 'До <strong>3-х</strong> вопросов в опросе'},
                        {icon: 'alert-circle', text: "До <strong>100</strong> респондентов на опрос"},
                        {icon: 'alert-circle', text: 'До <strong>7 дней</strong> статистики'},
                        {icon: 'alert-circle', text: '<strong>1</strong> шаблон'},
                    ]
                },
                IS_PREMIUM: false,
            },
            {
                ID: 2,
                NAME: 'premium',
                title: 'Премиум',
                image: require('@/assets/premium-logo.png'),
                descr: 'Подойдёт для активного сбора отзывов и для сетевого бизнеса — неограниченное количество опросов, расширенная статистика и пакет дополнительных опций.',
                btn: 'Подключить',
                list: {
                    title: '200 ₽ / мес.',
                    items: [
                        {icon: 'heart', text: 'Количество опросов — на Ваш выбор'},
                        {icon: 'heart', text: 'Неограниченное количество респондентов на опрос'},
                        {icon: 'heart', text: 'Неограниченное количество  вопросов в опросе'},
                        {icon: 'heart', text: 'Полная статистика'},
                        {icon: 'heart', text: 'Доступ ко всем шаблонам'},
                        //{icon: 'heart', text: 'Подключение соцсетей'},
                    ]
                },
                IS_PREMIUM: true,
            },
        ];*/
    },

    /**
     * todo move this info to BE
     * @param state
     * @returns {Array}
     */
    periodsDisplay(state) {
      let values = [];
      let periodsTmp =[];            
      Object.keys(state.common?.paymentPeriods).map( (key) => {                    
          periodsTmp.push( { period:  Number(key), discount:state.common?.paymentPeriods[key]});
      });
      periodsTmp.map((el) => {
          if ( el.period == 1 ) values.push( {name: "Месячная оплата" , value: el.period, discount: el.discount, priceTag: "/ мес." })
          if ( el.period == 6 ) values.push( {name: "Полугодовая оплата" , value: el.period, discount: el.discount, priceTag: "/ 6 мес." })
          if ( el.period == 12 ) values.push( {name: "Ежегодная оплата" , value: el.period, discount: el.discount, priceTag: "/ год." })
        })
      return values
    },
    paymentPeriods(state) {
      return state.common?.paymentPeriods;
    }
};
export default getters;
