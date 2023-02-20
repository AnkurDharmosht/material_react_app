import { createStore } from "redux";

const initialState = {
    totalFee: 0,
    isRoundOff: false,
    totalRoundOff: 0,
    tdsPercentage: 10,
    gstPercentage: 18,
    tds: 0,
    gst: 0,
    finalTotal: 0,
    taxType: "",
    taxableAmount: 0,
    creditLimit: 0,
    creditStatus: "",
};

const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case "set":
            return { ...state, ...rest };
        case "roundoff":
            return {
                ...state,
                isRoundOff: true,
                totalRoundOff: Math.round(state.totalFee)
            }
        case "tds":
            return {
                ...state,
                tds: ((state?.totalRoundOff?.totalRoundOff * state?.tdsPercentage?.tdsPercentage) / 100).toFixed(2)
            }
        case "finaltotal":
            return {
                ...state,
                finalTotal: (state.totalRoundOff !== 0 ? state.totalRoundOff + state.tds + state.gst : state.totalFee + state.tds + state.gst).toFixed(2)
            }
        case "reversetotal":
            return {
                ...state,
                finalTotal: (state.totalRoundOff !== 0 ? state.totalRoundOff - state.tds : state.totalFee - state.tds).toFixed(2)
            }
        case "forwardtotal":
            return {
                ...state,
                finalTotal: (state.totalRoundOff !== 0 ? (state.totalRoundOff - state.tds) + state.gst : (state.totalFee - state.tds) + state.gst).toFixed(2)
            }
        default:
            return state;
    }
};

const store = createStore(changeState);
export default store;
