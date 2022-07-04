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
    },

    /**
     * Если у пользователя "дефолтный" тариф или тариф не выбран - аккаунт suspended.
     * Такому пользователю недоступно большинство функций сервиса.
     * См. также routes (meta.isSuspendable).
     * @param state
     * @returns {boolean}
     */
    isSuspended(state) {
        if (!state.session?.user) return false;
        return !state.session?.user?.TARIFF ? true : state.session?.user?.TARIFF?.IS_DEFAULT //!res.session.user?.TARIFF ? true :  res.session.user?.TARIFF?.IS_DEFAULT;
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
