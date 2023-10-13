// actions/index.js
export const setUserInfo = (payload) => {
    return {
        type: 'set_UserInfo',
        payload
    }
}

export const addShop = (num) => {
    return {
        type: 'set_Count',
        payload: num
    }
}

export const addShopList = (payload) => {
    return {
        type: 'set_ShopAll',
        payload
    }
}