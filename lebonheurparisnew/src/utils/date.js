export function ddMonth(date) {
    if (!date) return '';

    let months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];
    let day = date.getDate();
    let monthIndex = date.getMonth();

    return day + ' ' + months[monthIndex];
}
export function monthName(index) {
    let months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ];
    return months[index];
}
export function monthIndex(month) {
    let months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ];
    return months.findIndex(el => el === month);
}
export function ddCutMonth(date) {
    if (!date) return '';

    let months = [
        'янв.',
        'фев.',
        'марта',
        'апр.',
        'мая',
        'июня',
        'июля',
        'авг.',
        'сен.',
        'окт.',
        'нояб.',
        'дек.',
    ];
    let day = date.getDate();
    let monthIndex = date.getMonth();

    return day + ' ' + months[monthIndex];
}

export function ddmmyyyy2Date(dmy) {
    if (typeof (dmy) === "undefined"
        || !dmy.match(/^\d{2}.\d{2}.\d{4}/)) return null;
    let dateParts = dmy.split(".");
    let date = new Date(parseInt(dateParts[2]),
        dateParts[1] - 1,
        parseInt(dateParts[0].substr(0, 2))
    );
    return date;
}

export function date2ddMonthyyyy(date){
    let jsDate = new Date(date);
    let day = jsDate.getDate();
    let monthIndex = jsDate.getMonth();
    let year = jsDate.getFullYear();
    return `${day} ${monthName(monthIndex)} ${year}`
}
