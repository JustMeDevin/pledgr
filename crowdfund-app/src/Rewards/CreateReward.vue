<template>
    <div id="bigdaddy-wrapper">
        <div id="reward-wrapper">
            <div id="reward-shape">
                <p id="dollar-symbol">$</p>
                <input v-on:keyup="targetHandler" class="create-project-input" id="create-reward-price" type="text" placeholder="Reward amount" v-model="reward.amount">
                <textarea :style="{height: (Math.floor(reward.description.length / 65) + 1.5) + 'rem'}" class="create-project-input" id="create-reward-description" cols="1" rows="5" placeholder="Reward description" v-model="reward.description"></textarea>
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
            targetHandler: function(event) {
                var reg = new RegExp('^[0-9]+$');
                if (!reg.test(event.key)) {
                    this.reward.amount = this.reward.amount.slice(0, -1);
                    event.preventDefault();
                }
            },

        },

        computed: {
        }
    }
</script>
