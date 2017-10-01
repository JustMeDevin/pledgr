<template>
    <div id="wrapper">
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>
        <div id="searchWrap">
            <input class="search" type="text" v-model="search" placeholder=""/>
        </div>

        <div id="projects" v-for="project in searchedProjects">
            <div class="project">
                <div id="img-wrapper">
                    <!--<img id="project-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/jeremiah-wilson-3.jpg" alt>-->
                </div>
                <h1>{{ project.title }}</h1>
                <h2>{{ project.subtitle }}</h2>
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
                projects: []
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
            }
        },
        computed: {
            searchedProjects: function() {
                var self=this;
                return this.projects.filter(function(project){return project.title.toLowerCase()
                    .indexOf(self.search.toLowerCase())>=0;});
            }
        }
    }
</script>





