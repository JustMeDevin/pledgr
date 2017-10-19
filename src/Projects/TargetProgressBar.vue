<template>
    <div id="progress-wrapper">
        <div id="progress" :style="{width: barWidth + 'px'}"></div>
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
                target: null,
                barWidth: null
            }

        },

        mounted: function() {
            this.calculateWidth();
        },

        methods: {
            calculateWidth: function(){
                this.barWidth = (this.amountRaised.progressAmount / this.amountRaised.target) * 300;
                if(this.barWidth < 8  && this.amountRaised.progressAmount > 0){

                    this.barWidth = 8;
                }

            }
        },

        computed: {
        }
    }
</script>





