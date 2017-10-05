<template>
    <div id="progress-wrapper">
        <div id="progress" :style="{width: ((amountRaised.progressAmount / amountRaised.target) * 300 + 'px')}"></div>
        <div id="progress-background"></div>
    </div>
</template>

<script>
    import { config } from '../config';

    export default {
        props: ['amountRaised'],
        data(){
            return{
                error: "",
                errorFlag: false,
                currentAmount: null,
                target: null
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





