<template>
    <div id="wrapper">
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>

        <div v-if="$route.params.projectId">
            <project-view> </project-view>
        </div>

        <div v-else>
            <div id="searchWrap">
                <input class="search" id="search-bar" type="text" v-model="search" placeholder=""/>
            </div>

            <div id="projects-wrapper">
                <div id="projects" v-for="project in searchedProjects" >
                    <div v-bind:id="project.id" class="project float">
                        <router-link :to="{name: 'project', params: {projectId: project.id}}" tag="div">
                            <div id="img-wrapper">
                                <img img :src="getImage(project)" v-bind:alt="project" onerror="this.style.display='none'">
                            </div>
                            <h1>{{ project.title }}</h1>
                            <h2>{{ project.subtitle }}</h2>
                            <p id="project-desc">{{ project.description }}</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { config } from '../config';
    import ProjectView from './ProjectView.vue';

    export default {
        data(){
            return{
                search: '',
                error: "",
                errorFlag: false,
                projects: []
            }
        },
        components: {
            ProjectView
        },
        mounted: function() {
            this.getProjects();
        },
        methods: {
            getProjects: function(){
                this.$http.get(config.apiUrl + "projects?open=true")
                .then(function(response){
                    this.projects = response.data;
                }, function(error) {
                    this.error = error;
                    this.errorFlag = true;
                });
            },

            getImage: function(project){
                return config.apiUrl + "projects/" + project.id + "/image";
            }
        },

        computed: {
            searchedProjects: function() {
                var self = this;
                return this.projects.filter(
                    function(project){
                        var exists = false;

                        if(project.title.toLowerCase().indexOf(self.search.toLowerCase()) >= 0){
                            exists = true;
                        }
                        if(project.subtitle.toLowerCase().indexOf(self.search.toLowerCase()) >= 0){
                            exists = true;
                        }
                        return exists;
                    });
            },
        }
    }
</script>





