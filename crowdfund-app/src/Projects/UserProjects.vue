<template>
    <div>
        <div v-if="$route.params.projectId">
            <project-view :previousPage="'myProjects'"> </project-view>
        </div>

        <div v-else>
            <div id="user-projects-wrapper">
                <div id="my-projects-wrapper">
                    <h3 id="my-projects-title">My projects</h3>
                    <div class="project-wrapper">
                        <div class="all-projects" v-for="project in myProjects">
                            <user-project-summary :project="project" class="float-in" ></user-project-summary>
                        </div>
                    </div>
                </div>

                <div id="backed-projects-wrapper">
                    <h3 id="backed-projects-title">Backed projects</h3>
                    <div class="project-wrapper">
                        <div class="all-projects" v-for="project in backedProjects">
                            <user-project-summary :project="project" :previousPage="'myProjects'" class="float-in"></user-project-summary>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import { config } from '../config';
    import ProjectSummary from './ProjectSummary.vue';
    import UserProjectSummary from './UserProjectSummary.vue';

    export default {
        data(){
            return{
                search: '',
                error: "",
                errorFlag: false,
                myProjects: [],
                backedProjects: []
            }
        },
        components: {
            UserProjectSummary
        },
        mounted: function() {
            this.getUserProjects();
            this.getBackedProjects();
        },
        watch: {

        },
        methods: {
            getUserProjects: function(){
                this.$http.get(config.apiUrl + "projects?creator=" + localStorage.getItem('userId'))
                    .then(function(response){
                        this.removeDuplicateProjects(response.data, this.myProjects);
                        if(response.data.length === 0){
                            this.addNoProjectsPane();
                        }
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },

            getBackedProjects: function(){
                this.$http.get(config.apiUrl + "projects?backer=" + localStorage.getItem('userId'))
                    .then(function(response){
                        this.removeDuplicateProjects(response.data, this.backedProjects);
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },

            removeDuplicateProjects: function(data, array){

                for(var i = 0; i < data.length ; i++){
                    var exists = false;
                    for(var j = 0; j < array.length ; j++){
                        if(data[i].id === array[j].id){
                            exists = true;
                        }
                    }
                    if(!exists){
                        array.push(data[i]);
                    }
                }
            },

            addNoProjectsPane: function(){

            }
        },

        computed: {

        }
    }
</script>

