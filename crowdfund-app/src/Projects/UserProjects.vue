<template>
    <div>
        <div id="user-projects-wrapper">
            <div id="my-projects-wrapper">
                <h3 id="my-projects-title">My projects</h3>
                <div class="project-wrapper">
                    <div class="all-projects" v-for="project in myProjects">
                        <project-summary :project="project"></project-summary>
                    </div>
                </div>
            </div>

            <div id="backed-projects-wrapper">
                <h3 id="backed-projects-title">Backed projects</h3>
                <div class="project-wrapper">
                    <div class="all-projects" v-for="project in backedProjects">
                        <project-summary :project="project"></project-summary>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { config } from '../config';
    import ProjectSummary from './ProjectSummary.vue';

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
            ProjectSummary
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
                        console.log(response.data);
                        this.myProjects = response.data;
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },

            getBackedProjects: function(){
                this.$http.get(config.apiUrl + "projects?backer=" + localStorage.getItem('userId'))
                    .then(function(response){
                        console.log(response.data);
                        this.backedProjects = response.data;
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            }
        },

        computed: {

        }
    }
</script>

