<template>
    <div>
        <div v-if="isLoggedIn">
            <p id="payment-header">Payment</p>
            <form class="payment-form" v-on:submit.prevent="" id="payment-form">
                <fieldset>
                    <input class="input" id="name-on-Card" v-model="card.name" placeholder="name">

                    <input class="input" id="card-number" v-model="card.number" placeholder="card number">

                    <input class="input" id="date-month" v-model="card.expiry" placeholder="mm-yy">

                    <input class="input " id="card-cvv" v-model="card.cvv" placeholder="cvv">

                </fieldset>
            </form>
        </div>

        <div v-else>
            <p id="payment-header">Please Log in to pledge</p>

        </div>

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
                isLoggedIn: false
            }
        },

        mounted: function() {
            this.isLoggedIn = localStorage.getItem('isLoggedIn');
        },

        methods: {

        },

        watch: {
        },

        computed: {

        }
    }
</script>