<template>

    <div>
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>

        <h3>Projects</h3>
        <div id="projects" v-for="project in projects">
            <div class="project">
                <!--<img class="project-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/jeremiah-wilson-5.jpg" alt>-->
                <h1>{{ project.title }}</h1>
                <h2>{{ project.subtitle }}</h2>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                error: "",
                errorFlag: false,
                projects: []
            }
        },
        mounted: function() {
            this.getProjects();
        },
        methods: {
            getProjects: function(){
                this.$http.get('http://localhost:4941/api/v2/projects')
                .then(function(response){
                    this.projects = response.data;
                }, function(error) {
                    this.error = error;
                    this.errorFlag = true;
                });
            }
        }
    }
</script>