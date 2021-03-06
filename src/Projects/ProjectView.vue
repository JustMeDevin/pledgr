<template>
    <div>
        <reward-details v-model="pledgeSuccessful" v-if="$route.params.rewardId" :rewardProject="rewardProject"></reward-details>

        <router-link :to="{name: 'project', params: {projectId: $route.params.projectId}}"
                     v-bind:class="[$route.params.rewardId ? 'window-open' : '', 'window-close']"
                     class="fade-window"></router-link>

        <div v-bind:class="[selectedProject ? 'open-project' : 'close-project']" id="details-wrapper">

            <button v-on:click="goBack" tag="button" id="back-to-projects-button" class="pledgr-button-bold button-float">
                <img src="/src/img/exitCross.png" alt="cross" style="width:25px;height:25px;">
            </button>

            <div id="pane-wrapper">
                <div v-if="selectedProject" id="project-details">
                    <h3>{{ selectedProject.title }}</h3>
                    <h4>{{ selectedProject.subtitle }}</h4>
                    <div id="righthand-project-details">
                        <div id="img-wrapper-pDetails">
                            <image-uploader :uploadImage="uploadImage" v-if="isCreator"> </image-uploader>
                            <img id="project-image" img :src="getImage(selectedProject)" v-bind:alt="selectedProject" onerror="this.style.display='none'">
                        </div>

                        <div id="creation-date-wrapper">
                            <p id="creation">Created: {{ date }}</p>
                        </div>

                        <div id="backers-wrapper">
                            <h5>Backers</h5>
                            <div id="backer-wrapper">
                                <div v-if="selectedProject.backers[0] == null" class="float-in">
                                    <pledger :backer="null"></pledger>
                                </div>

                                <div id="backers" v-else v-for="backer in backers" class="float-in">
                                    <div>
                                        <pledger :backer="backer"> </pledger>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="creators-wrapper">
                            <h5> Creators </h5>
                            <div id="circle-wrappers" class="float-in">
                                <div v-for="creator in selectedProject.creators" id="creator-div">
                                    <p id="creator-names">{{creator.username}}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div id="lefthand-project-details">

                        <p id="project-description" class="float-in"> {{ selectedProject.description }}</p>

                        <h5>Progress</h5>
                        <div id="progress-wrapper">
                            <p id="current-pledged-amount">${{ Number(amountRaised.currentAmount).toLocaleString('en') }}</p>
                            <p id="target-amount-desc"> pledged of ${{ Number(selectedProject.target).toLocaleString('en') }} goal</p>
                            <div id="target-wrapper">
                                <target-progress-bar :amountRaised="amountRaised"> </target-progress-bar>
                            </div>
                            <p id="backers-desc">{{ amountRaised.numberBackers }} backers</p>
                        </div>

                        <div id="rewards-wrapper">
                            <h5 id="rewards-header">Rewards</h5>
                            <div id="rewards" v-for="reward in selectedProject.rewards">
                                <reward :reward="reward"></reward>
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
    import Pledger from '../Pledging/Pledger.vue';
    import TargetProgressBar from './TargetProgressBar.vue';
    import RewardDetails from '../Rewards/RewardDetails.vue';
    import ImageUploader from './ImageUploader.vue';

    export default {
        props: ['previousPage'],

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
                    target: 0,
                    currentAmount: 0,
                    progressAmount: 0,
                    numberBackers: 0
                },
                date: null,
                pledgeSuccessful: false,
                rewardProject: {
                    projectId: null,
                    open: null,
                    creators: []
                },
                isCreator: false,
                uploadImage: {
                    send: false,
                    id: null,
                    image: null,
                    type: null,
                    currentImage: null
                }
            }
        },
        components: {
            Reward,
            Pledger,
            TargetProgressBar,
            RewardDetails,
            ImageUploader
        },

        mounted: function() {
            this.getProject();
        },
        watch: {
            '$route.params.rewardId': function(){
                this.getProject();
            },
            'uploadImage.image': function(){
                this.sendImage();
            }
        },

        methods: {
            getImage: function(){
                return config.apiUrl + "projects/" + this.$route.params.projectId + "/image";
            },

            calculateAnonBackers: function(){
                this.backers = [];
                this.anonBacker.amount = 0;
                this.backers.push(this.anonBacker);
                var knownBackers = [];

                for(var i = 0; i < this.selectedProject.backers.length; i++){

                    if(this.selectedProject.backers[i].username == 'anonymous'){
                        this.anonBacker.amount = this.anonBacker.amount + this.selectedProject.backers[i].amount;
                    }else{
                        knownBackers.push(this.selectedProject.backers[i]);
                    }
                }

                var length = 4;
                if(knownBackers.length < 4) {
                    length = knownBackers.length;
                }

                for(var i = 0 ; i < length ; i++){
                    this.backers.push(knownBackers[(length - 1 )-i]);
                }
            },

            sendImage: function(){
                var header = {
                    headers: {
                        'X-Authorization': localStorage.getItem('userToken'),
                        'Content-Type': this.uploadImage.type
                    }
                }

                this.$http.put(config.apiUrl + "projects/" + this.selectedProject.id + "/image", this.uploadImage.image, header)
                    .then(function(response){

                    }, function(error) {
                        console.log(error);
                        this.error = error;
                        this.errorFlag = true;
                    });
            },

            goBack: function(){
                if(this.uploadImage.image != null){
                    this.sendImage();
                }
                this.$router.push({name: this.previousPage});
            },

            getProject: function(){
                this.$http.get(config.apiUrl + "projects/" + this.$route.params.projectId)
                    .then(function(response){
                        this.selectedProject = response.data;
                        this.calculateAnonBackers();
                        this.updateTargetInfo();
                        this.getDate();
                        this.rewardProject.projectId = this.selectedProject.id;
                        this.rewardProject.open = this.selectedProject.open;
                        this.rewardProject.creators = this.selectedProject.creators;
                        this.isUserCreator();
                        console.log(this.selectedProject);
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },

            isUserCreator: function(){
                for(var i = 0 ; i < this.selectedProject.creators.length; i++){
                    if(this.selectedProject.creators[i].id == localStorage.getItem('userId')){
                        this.isCreator = true;
                    }
                }
            },


            getDate: function(){

                var date = new Date( parseFloat( this.selectedProject.creationDate));
                this.date = date.getHours() +
                    ":" + date.getMinutes() +
                    " " + date.getDate() +
                    "/" + date.getMonth() +
                    "/" + date.getFullYear();

            },

            updateTargetInfo: function(){
                if(this.selectedProject.progress != null){
                    if(this.selectedProject.progress.currentPledged >= this.selectedProject.target){
                        this.amountRaised.progressAmount = this.selectedProject.target;
                    }else{
                        this.amountRaised.progressAmount = this.selectedProject.progress.currentPledged;
                    }
                    this.amountRaised.numberBackers = this.selectedProject.progress.numberOfBackers;
                    this.amountRaised.currentAmount = this.selectedProject.progress.currentPledged;
                }else{
                    this.amountRaised.currentAmount = 0;
                }
                this.amountRaised.target = this.selectedProject.target;
                console.log()
            }
        },

        computed: {
        }
    }
</script>





