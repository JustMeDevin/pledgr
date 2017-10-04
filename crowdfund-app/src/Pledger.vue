<template>

    <div v-if="backer != null" class="pledger-div">
        <p> <b class="backer-amount">${{ backer.amount }}</b><br><small id="backer-name">{{ backer.username }}</small></p>
    </div>

    <div v-else class="pledger-div empty-backers">
        <p id="no-backers">No<br>backers</p>
    </div>

</template>

<script>
    import { config } from './config';

    export default {
        props: ['backer'],
        data(){
            return{
                error: "",
                errorFlag: false,
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





