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
                    <input v-bind:class="[titleInvalid  ? 'invalidInput create-project-input' : '', 'create-project-input']" id="create-project-title" type="text" placeholder="Title" v-model="newProject.title">
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

                        <textarea :style="{height: (Math.floor(newProject.description.length / 86) + 1.5) + 'rem'}" class="create-project-input" id="create-project-description" cols="40" rows="5" placeholder="Description" v-model="newProject.description" ></textarea>

                        <div id="target-wrapper">
                            <h5 id="target-header" class="create-project-headings">Target</h5>
                            <p id="target-symbol">$</p>
                            <input class="" v-on:keyup="targetHandler" id="create-project-target" placeholder="amount" v-model="newProject.target">
                        </div>

                        <div id="create-rewards-wrapper">
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
                titleInvalid: false,
                newProject: {
                    title: null,
                    subtitle: null,
                    description: "",
                    target: null,
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
            this.creator.id = parseInt(localStorage.getItem('userId'));
            this.newProject.creators[0].id = parseInt(localStorage.getItem('userId'));
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

        },

        methods: {
            targetHandler: function(event) {
                var reg = new RegExp('^[0-9]+$');
                if (!reg.test(event.key)) {
                    this.newProject.target = this.newProject.target.slice(0, -1);
                    event.preventDefault();
                }
            },

            createProject: function(){
                if(this.checkInputs()){
                    var header = {
                        headers: {
                            'X-Authorization': localStorage.getItem('userToken')}
                    }

                    var body = this.createBody();

                    this.$http.post(config.apiUrl + "projects/", body, header)
                        .then(function(response){
                            if(response.ok == true){
                                this.$router.push({ name: 'myProjects'})
                            }
                        }, function(error) {
                            this.error = error;
                            this.errorFlag = true;
                        });
                }
            },

            checkInputs: function(){
                var errors = 0;
                if(this.newProject.title === null){
                    this.titleInvalid = true;
                    errors += 1;
                    console.log("no title");
                }else{
                    this.titleInvalid = false;
                }

                if(this.newProject.subtitle === null){
                    errors += 1;
                    console.log("no subtitle");
                }

                if(this.newProject.description === ""){
                    errors += 1;
                    console.log("no desc");
                }

                if(this.rewards.length === 1 && this.rewards[0].amount === null){
                    errors += 1;
                    console.log("no rewards");
                }

                if(this.newProject.target === null){
                    errors += 1;
                    console.log("no target");
                }

                if(errors != 0){
                    return false;
                }

                return true;
            },

            createBody: function(){
                this.rewards.pop();

                for(var i = 0; i < this.rewards.length; i++){
                    if(this.rewards[i].amount != "" && this.rewards[i].description != ""){
                        this.rewards[i].amount = parseInt(this.rewards[i].amount);
                        this.newProject.rewards.push(this.rewards[i]);
                    }
                }

                this.newProject.target = parseInt(this.newProject.target);

                var body = JSON.stringify(this.newProject);

                console.log(body);
                return body;
            }
        },

        computed: {

        }
    }
</script>