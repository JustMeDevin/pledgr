<template>
    <div v-bind:id="project.id" class="project float">
        <router-link :to="{name: 'project', params: {projectId: project.id}}" tag="div">
            <div id="img-wrapper">
                <img id="project-img" img :src="getImage(project)" v-bind:alt="project" onerror="this.style.display='none'">

            </div>
            <h1>{{ project.title }}</h1>
            <h2>{{ project.subtitle }}</h2>
            <p id="project-desc">{{ project.description }}</p>
        </router-link>
    </div>

</template>

<script>
    import { config } from '../config';

    export default {
        props: ['project', 'previousPage'],

        data(){
            return{
                search: '',
                error: "",
                errorFlag: false,
                projects: []
            }
        },
        methods: {
            getImage: function(project){
                return config.apiUrl + "projects/" + project.id + "/image";
            }
        },
    }
</script>