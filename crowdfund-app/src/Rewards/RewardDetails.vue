<template>
<div v-if="selectedReward" id="bigdaddy-details-wrapper">
    <div id="reward-details-wrapper">
        <div id="reward-details-shape" v-bind:class="[isPaying ? 'payment-process-window' : 'reward-window']">

            <div id="payment-wrapper">
                <pledge-payment v-bind:class="[isPaying ? 'transition-element-in' : 'no-class']" v-if="isPaying"> </pledge-payment>
            </div>

            <div >
                <p v-bind:class="[isPaying ? 'transition-amount-out' : 'no-class']" id="reward-details-price"> Pledge ${{ selectedReward.amount }}</p>
                <p v-bind:class="[isPaying ? 'transition-description-out' : 'no-class']" id="reward-details-description"> {{ selectedReward.description }}</p>
            </div>

            <button v-on:click="isPaying = !isPaying" id="pledge-button" class="springboard-button pledgr-button button-float">Pledge</button>

        </div>
    </div>
</div>
</template>

<script>
    import { config } from '../config';
    import PledgePayment from '../Pledging/PledgePayment.vue';

    export default {
        props: ['projectId'],

        components: {
            PledgePayment
        },
        data(){
            return{
                availableRewards: [],
                selectedReward: null,
                isPaying: false
            }
        },

        mounted: function() {
            this.getRewards();
        },
        methods: {
            getRewards: function(){
                this.$http.get(config.apiUrl + "projects/" + this.projectId + "/rewards")
                    .then(function(response){
                        this.availableRewards = response.data;
                        this.getReward()
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },

            getReward: function(){
                for(var i = 0; i < this.availableRewards.length ; i++){
                    if(this.availableRewards[i].id == this.$route.params.rewardId){
                        this.selectedReward = this.availableRewards[i];
                    }
                }
            }
        },

        watch: {
            '$route.params.rewardId'() {
                this.getReward();
            }
        },


        computed: {
        }
    }
</script>