<template>
    <div id="wrapper">
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>

        <div id="details-wrapper">
            <div v-if="selectedProject !== null" id="project-details">
                <h3>{{ selectedProject.title }}</h3>
                <h4>{{ selectedProject.subtitle }}</h4>

                <div id="img-wrapper-pDetails">
                    <img img :src="getImage(selectedProject)" v-bind:alt="selectedProject" onerror="this.style.display='none'">
                </div>

                <p id="project-description"> {{ selectedProject.description }}</p>

                <h5> Creators </h5>
                <p v-for="creator in selectedProject.creators"> {{ creator.username }} </p>


            </div>
        </div>

        <div id="searchWrap">
            <input v-if="!isSelected" class="search" id="search-bar" type="text" v-model="search" placeholder=""/>
        </div>

        <div id="projects-wrapper">
            <div id="projects" v-if="!isSelected" v-for="project in searchedProjects" >
                <div v-bind:id="project.id" class="project float" v-on:click="getProject(project)">
                    <div id="img-wrapper">
                        <img img :src="getImage(project)" v-bind:alt="project" onerror="this.style.display='none'">
                    </div>
                    <h1>{{ project.title }}</h1>
                    <h2>{{ project.subtitle }}</h2>
                    <p id="project-desc">{{ project.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { config } from './config';

    export default {
        data(){
            return{
                search: '',
                error: "",
                errorFlag: false,
                projects: [],
                selectedProject: null,
                isSelected: false
            }
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
            },

            getProject: function(project){
                this.$http.get(config.apiUrl + "projects/" + project.id)
                    .then(function(response){
                        this.selectedProject = response.data;
                        this.hideProjects();
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },

            hideProjects: function(){
                this.isSelected = !this.isSelected;
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





