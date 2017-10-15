<template>
    <div id="wrapper">
        <div>
            <div id="staff-picks-wrapper">
                <div id="picks-projects-wrapper">
                    <h3 id="staff-picks-title">Recent Projects</h3>
                    <div id="wrap-wrap">
                        <div class="staff-project-wrapper">
                            <div class="all-projects" v-for="project in recentProjects">
                                <project-summary :project="project"></project-summary>
                            </div>
                            <router-link :to="{name: 'projects'}" class="pledgr-button float" id="view-all-project" tag="button">view all</router-link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { config } from './config';
    import ProjectSummary from './Projects/ProjectSummary.vue';

    export default {
        data(){
            return{
                search: '',
                error: "",
                errorFlag: false,
                recentProjects: []
            }
        },
        components: {
            ProjectSummary
        },
        mounted: function() {
            this.getProjects();
        },
        watch: {

        },
        methods: {

            getProjects: function(){
                this.$http.get(config.apiUrl + "projects?startIndex=0&count=3&open=true")
                    .then(function(response){
                        this.recentProjects = response.data;
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

