/**
 * Returns merged objects as a sibgle object.
 * TS so far does not support this out of the box.
 */
export function mergeObjects(...args) {
    let target = args[0];
    for (let i = 1; i < arguments.length; i++) {
        let source = arguments[i];
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}

export function scrollTo(id, offset = 0) {
    const el = document.getElementById(id);
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({
        top,
        behavior: "smooth"
    });
}

export function format(value, pattern) {
    let i = 0;
    let v = value.toString();
    return pattern.replace(/#/g, _ => v[i++]);
}

export function iOSMobile() {
    const iOSMobile = [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    console.log("IsIos iOSMobile ", iOSMobile)
    return iOSMobile
}
