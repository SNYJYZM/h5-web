import { createRouter, createWebHashHistory,createWebHistory } from "vue-router";
const routes = [

    {
        path: '/',
        name:"home",
        component: () => import("@/views/Home.vue")
    },
    {
        path: '/login',
        name:"login",
        component: () => import("@/views/Login.vue")
    },
    {
        path: '/face',
        name:"face",
        component: () => import("@/views/Face.vue")
    },
]

const router = createRouter({
    //  history: createWebHashHistory('/'),
    history: createWebHistory(),
    routes
})

export default router
