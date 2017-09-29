<template>

    <div>
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>
        <div id="searchWrap">
            <input class="search" type="text" v-model="search" placeholder="search..."/>
        </div>

        <div id="projects" v-for="project in searchedProjects">
            <div class="project">
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
                this.$http.get('http://localhost:4941/api/v2/projects')
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
                return this.projects.filter(function(project){return project.title.toLowerCase().indexOf(self.search.toLowerCase())>=0;});
            }
        }
    }
</script>





