<template>

    <div v-if="backer != null" class="pledger-div">
        <p> <b class="backer-amount">${{ Number(backer.amount).toLocaleString('en') }}</b><br><small id="backer-name">{{ backer.username }}</small></p>
    </div>

    <div class="pledger-div empty-backers float-in" v-else >
        <p id="no-backers">No<br>backers</p>
    </div>

</template>

<script>
    import { config } from '../config';

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





