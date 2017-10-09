<template>
    <div>
        <p id="payment-header">Payment</p>
        <form class="payment-form" v-on:submit.prevent="" id="payment-form">
            <fieldset>
                <input class="input" id="name-on-Card" v-model="card.name" type="text" placeholder="name">

                <input class="input" id="card-number" v-model="card.number" type="text" placeholder="card number">

                <input class="input" id="date-month" v-model="card.expiry" type="text" placeholder="mm-yy">

                <input class="input " id="card-cvv" v-model="card.cvv" type="text" placeholder="cvv">

            </fieldset>
        </form>
    </div>

</template>

<script>
    import { config } from '../config';

    export default {
        data(){
            return{
                card: {
                    name: null,
                    number: null,
                    expiry: null,
                    cvv: null
                },
            }
        },

        mounted: function() {
        },
        methods: {
        },

        watch: {
        },

        computed: {
        }
    }
</script>