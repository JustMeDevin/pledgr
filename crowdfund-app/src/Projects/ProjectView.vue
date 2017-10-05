<template>
    <div id="details-wrapper">
        <div v-if="selectedProject" id="project-details">
            <div id="project-button-bar">
                <router-link :to="{name: 'projects'}" tag="button" id="back-to-projects-button" class="pledgr-button-bold button-float">back</router-link>
            </div>

            <div id="target-wrapper">
                <target-progress-bar :amountRaised="amountRaised"> </target-progress-bar>
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
                <div id="backer-wrapper">
                    <div v-if="selectedProject.backers[0] == null">
                        <pledger :backer="null"></pledger>
                    </div>

                    <div id="backers" v-else v-for="backer in backers">
                        <pledger :backer="backer"> </pledger>
                    </div>
                </div>
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
    import { config } from '../config';
    import Reward from './Reward.vue'
    import Pledger from './Pledger.vue'
    import TargetProgressBar from './TargetProgressBar.vue'

    export default {
        data(){
            return{
                error: "",
                errorFlag: false,
                projects: [],
                selectedProject: null,
                progressValue: 0.5,
                noBackers: {
                    username: null,
                    amount: null
                },
                backers: [],
                anonBacker:{
                    username: "anonymous",
                    amount: 0
                },
                amountRaised:{
                    target: null,
                    currentAmount: null
                }
            }
        },
        components: {
            Reward,
            Pledger,
            TargetProgressBar
        },

        mounted: function() {
            this.getProject();
        },
        methods: {
            getImage: function(){
                return config.apiUrl + "projects/" + this.$route.params.projectId + "/image";
            },

            calculateAnonBackers: function(){
                this.backers.push(this.anonBacker);
                var knownBackers = [];

                for(var i = 0; i < this.selectedProject.backers.length; i++){

                    if(this.selectedProject.backers[i].username == 'anonymous'){
                        this.anonBacker.amount = this.anonBacker.amount + this.selectedProject.backers[i].amount;
                    }else{
                        knownBackers.push(this.selectedProject.backers[i]);
                    }
                }

                var lastFive = knownBackers.slice(-4)
                for(var i = 0 ; i < knownBackers.length && i < 4 ; i++){
                    this.backers.push(lastFive[i])
                }
            },

            getProject: function(){
                this.$http.get(config.apiUrl + "projects/" + this.$route.params.projectId)
                    .then(function(response){
                        this.selectedProject = response.data;
                        this.calculateAnonBackers();
                        this.updateTargetInfo();
                        console.log(this.selectedProject);
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },

            updateTargetInfo: function(){
                if(this.selectedProject.progress.currentPledged > this.selectedProject.target){
                    this.amountRaised.currentAmount = this.selectedProject.target;
                }
                this.amountRaised.currentAmount = this.selectedProject.progress.currentPledged;
                this.amountRaised.target = this.selectedProject.target;
            }
        },

        computed: {
        }
    }
</script>





