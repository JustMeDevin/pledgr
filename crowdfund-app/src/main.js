import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';
import Projects from './Projects.vue'

import VueResource from 'vue-resource';
Vue.use(VueResource);

import VueRouter from 'vue-router';
Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/projects",
        name: projects,
        component: Projects
    },
    {
        path: "/projects/:projectId",
        name: project,
        component: Projects
    }
];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

Vue.http.options.emulateJSON = true;






new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})
