import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';
import Projects from './Projects/Projects.vue';
import CreateProject from './Projects/CreateProject.vue';
import UserProjects from './Projects/UserProjects.vue';

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
        name: "projects",
        component: Projects
    },
    {
        path: "/projects/:projectId",
        name: "project",
        component: Projects
    },
    {
        path: "/projects/:projectId/rewards/:rewardId",
        name: "reward",
        component: Projects
    },
    {
        path: "/user/my-projects/new",
        name: "createProject",
        component: CreateProject
    },
    {
        path: "/user/my-projects",
        name: "myProjects",
        component: UserProjects
    }

];

const router = new VueRouter({
    routes: routes,
    mode: 'history',
    saveScrollPosition: true
});

Vue.http.options.emulateJSON = true;



new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})
