<template>
    <div id="bigdaddy-wrapper">
        <div id="reward-wrapper">
            <div id="reward-shape" class="float">
                <p id="reward-price"> Pledge ${{ reward.amount}}</p>
                <p id="reward-description"> {{ reward.description }}</p>
            </div>
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





