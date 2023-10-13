const initialState = {
    userInfo: Object,
    shopAll: [],
    count: 0
}
export const reducer = (state = initialState, action) => {
    const { payload } = action
    switch (action.type) {
        case 'set_UserInfo':
            console.log(payload);
            return {
                ...state,
                userInfo: payload
            }
        case 'set_Count':
            return {
                ...state,
                count: payload
            }
        case 'set_ShopAll':
            return {
                ...state,
                shopAll: payload
            }
        default:
            return state
    }
}