import testQs from "./testQs";
import testResults from "./testResults";
import collection from "./collection";

let state = {
    info: {
        phone: "8 800 250 05 57"
    },
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,

    aosDelay: 100,

    swipers: {
        'power-slider': null,
        'heroes': null,
        'collection-slider': null,
    },

    //checkboxId: 1,  //used to properly label checkboxes
    isTestRunning: false,

    testQs,
    testResults,

    collection
};
export default state;