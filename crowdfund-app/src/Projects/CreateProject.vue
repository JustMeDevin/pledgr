<template>
    <div>
        <div id="details-wrapper">
            <div id="back-wrapper">
                <router-link :to="{name: 'myProjects'}" tag="button" id="back-to-projects-button" class="pledgr-button-bold button-float">
                    <img src="/src/img/exitCross.png" alt="cross" style="width:25px;height:25px;">
                </router-link>
            </div>

            <div id="pane-wrapper">
                <div v-if="newProject" id="project-details">
                    <input class="create-project-input" id="create-project-title" type="text" placeholder="Title" v-model="newProject.title">
                    <input class="create-project-input" id="create-project-subtitle" type="text" placeholder="Subtitle" v-model="newProject.subtitle">
                    <div id="righthand-project-details">

                        <div id="img-wrapper-pDetails">
                        </div>

                        <div id="creators-wrapper">
                            <h5 class="create-project-headings"> Creators </h5>
                            <div id="circle-wrappers" class="float-in">
                                <div id="create-creator-div">
                                    <p id="creator-names">{{ creator.username }}</p>
                                </div>
                            </div>
                        </div>

                        <button id="launch-project-button" class="springboard-button pledgr-button button-float" v-on:click="createProject">Launch Project</button>

                    </div>

                    <div id="lefthand-project-details">

                        <textarea class="create-project-input" id="create-project-description" cols="40" rows="5" placeholder="Description" v-model="newProject.description" ></textarea>

                        <div id="rewards-wrapper">
                            <h5 id="rewards-header" class="create-project-headings">Rewards</h5>
                            <div id="rewards" v-for="reward in rewards">
                                <create-reward :reward="reward"></create-reward>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { config } from '../config';
    import Reward from '../Rewards/RewardSummary.vue';
    import CreateReward from '../Rewards/CreateReward.vue';

    export default {
        data(){
            return{
                search: '',
                error: "",
                errorFlag: false,
                newProject: {
                    title: "",
                    subtitle: "",
                    description: "",
                    target: 0,
                    creators: [
                        {
                            id: null
                        },

                    ],
                    rewards: [

                    ]
                },
                creator: {
                    username: null,
                    id: null
                },
                rewards: [
                    {
                        amount: "",
                        description: ""
                    }
                ]
            }
        },

        components: {
            CreateReward
        },

        mounted: function(){
            this.creator.username = localStorage.getItem('username');
            this.creator.id = localStorage.getItem('userId')
            this.newProject.creators[0].id = localStorage.getItem('userId');
        },

        watch: {
            rewards: {
                handler: function (after) {
                    var lastItem = this.rewards.length - 1;
                    if(this.rewards[lastItem].amount != "" && this.rewards[lastItem].description != ""){
                        this.rewards.push({
                            amount: "",
                            description: ""
                        });
                    }
                },
                deep: true
            },

           'newProject.rewards'(newVal){
               console.log("here");
               var lastItem = this.newProject.rewards.length - 1;
               if(this.newProject.rewards[lastItem].amount != "" && this.newProject.rewards[lastItem].description != ""){
                   this.newProject.rewards.push({
                       amount: "",
                       description: ""
                   });
               }
           }

        },

        methods: {
            createProject: function(){
            },
        },

        computed: {

        }
    }
</script>