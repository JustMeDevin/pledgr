<template>
    <div id="details-wrapper">
        <div id="project-details">
            <div id="project-button-bar">
                <router-link :to="{name: 'projects'}" tag="button" id="back-to-projects-button" class="pledgr-button-bold button-float">back</router-link>
            </div>
            <div id="img-wrapper-pDetails">
                <img img :src="getImage(selectedProject)" v-bind:alt="selectedProject" onerror="this.style.display='none'">
            </div>

            <h3>{{ selectedProject.title }}</h3>
            <h4>{{ selectedProject.subtitle }}</h4>

            <p id="project-description"> {{ selectedProject.description }}</p>

            <h5 id="rewards-header">Rewards</h5>
            <div id="rewards" v-for="reward in selectedProject.rewards">
                <reward :reward="reward"></reward>
            </div>

            <div id="backers-wrapper">
                <h5>Backers</h5>
            </div>

            <div id="creators-wrapper">
                <h5> Creators </h5>
                <div id="circle-wrappers">
                    <div v-for="creator in selectedProject.creators" id="creator-div">
                        <p id="creator-names">{{creator.username}}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import { config } from './config';
    import Reward from './Reward.vue'

    export default {
        data(){
            return{
                search: '',
                error: "",
                errorFlag: false,
                projects: [],
                selectedProject: null,
                progressValue: 0.5
            }
        },
        components: {
            Reward
        },

        mounted: function() {
            this.getProject();
        },
        methods: {
            getImage: function(){
                return config.apiUrl + "projects/" + this.$route.params.projectId + "/image";
            },

            getProject: function(){
                this.$http.get(config.apiUrl + "projects/" + this.$route.params.projectId)
                    .then(function(response){
                        this.selectedProject = response.data;
                        console.log(this.selectedProject);
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





