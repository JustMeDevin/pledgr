<template>
    <div id="details-wrapper">
        <div id="project-details">
            <router-link :to="{name: 'projects'}" tag="button" id="back-to-projects-button" class="pledgr-button-bold button-float">back</router-link>
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
            }
        },
        mounted: function() {
            this.getProject();
        },
        methods: {
            getImage: function(project){
                return config.apiUrl + "projects/" + this.$route.params.projectId + "/image";
            },

            getProject: function(){
                this.$http.get(config.apiUrl + "projects/" + this.$route.params.projectId)
                    .then(function(response){
                        this.selectedProject = response.data;
                        this.hideProjects();
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
        },

        computed: {
        }
    }
</script>





