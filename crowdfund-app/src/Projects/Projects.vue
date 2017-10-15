<template>
    <div id="wrapper">
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>

        <div v-if="$route.params.projectId">
            <project-view :previousPage="'projects'"> </project-view>
        </div>

        <div v-else>
            <div id="searchWrap">
                <input class="search" id="search-bar" type="text" v-model="search" placeholder=""/>
            </div>

            <div id="projects-wrapper">
                <div id="projects" v-for="project in searchedProjects">
                    <project-summary :project="project" :previousPage="'projects'"></project-summary>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { config } from '../config';
    import ProjectView from './ProjectView.vue';
    import ProjectSummary from './ProjectSummary.vue';

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
            ProjectView,
            ProjectSummary
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





