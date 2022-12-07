import { defineStore } from 'pinia'
export const appStore = defineStore({
    id: 'yunjiapp',
    state: () => {
        return {
            userInfo: {
                id: "",
                name: "",
            },

            tempVenueId: 0
        }
    },
    getters: {},
    actions: {},
    // 开启数据缓存
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'yunji-app',
                storage: localStorage,
            }
        ]
    }
})
