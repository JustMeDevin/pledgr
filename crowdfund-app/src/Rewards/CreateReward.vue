<template>
    <div id="bigdaddy-wrapper">
        <div id="reward-wrapper">
            <div id="reward-shape">
                <p id="dollar-symbol">$</p>
                <input class="create-project-input" id="create-reward-price" type="text" placeholder="Reward amount" v-model="reward.amount">
                <textarea class="create-project-input" id="create-reward-description" cols="1" rows="5" placeholder="Reward description" v-model="reward.description"></textarea>
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
