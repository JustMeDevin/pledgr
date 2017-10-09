<template>
    <div id="bigdaddy-wrapper">
        <div id="reward-wrapper">
            <router-link :to="{name: 'reward', params: {rewardId: reward.id}} " id="reward-shape" class="float" tag="div">
                <p id="reward-price"> Pledge ${{ reward.amount}}</p>
                <p id="reward-description"> {{ reward.description }}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
    import { config } from '../config';

    export default {
        props: ['reward'],
        data(){
            return{
            }
        },

        mounted: function() {

        },
        methods: {

        },

        computed: {
        }
    }
</script>





