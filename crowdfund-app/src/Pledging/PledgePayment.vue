<template>
    <div>
        <div v-if="isLoggedIn">
            <p class="payment-header">Payment</p>
            <form class="payment-form" v-on:submit.prevent="" id="payment-form">
                <fieldset>
                    <img src="/src/img/payment.png" alt="cross" id="payment-so-real" style="width:90px;height:25px;">
                    <input v-bind:class="[nameInvalid  ? 'invalidInput input' : '', 'input']" id="name-on-Card" v-model="card.name" placeholder="name">

                    <input v-bind:class="[numberInvalid  ? 'invalidInput input' : '', 'input']" id="card-number" v-model="card.number" placeholder="card number">

                    <input v-bind:class="[expiryInvalid  ? 'invalidInput input' : '', 'input']" id="date-month" v-model="card.expiry" placeholder="mm-yy">

                    <input v-bind:class="[cvvInvalid  ? 'invalidInput input' : '', 'input']" id="card-cvv" v-model="card.cvv" placeholder="cvv">

                </fieldset>
            </form>
        </div>

        <div v-else>

            <p class="payment-header">Please Log in to pledge</p>

        </div>

    </div>

</template>

<script>
    import { config } from '../config';

    export default {
        props: ['paymentProcess'],
        data(){
            return{
                card: {
                    name: null,
                    number: null,
                    expiry: null,
                    cvv: null
                },
                isLoggedIn: false,
                nameInvalid: false,
                numberInvalid: false,
                expiryInvalid: false,
                cvvInvalid: false
            }
        },

        mounted: function() {
            this.isLoggedIn = localStorage.getItem('isLoggedIn');
        },

        methods: {
            checkInput: function(){
                var errors = 0;
                if(this.card.name == null){
                    errors += 1;
                    this.nameInvalid = true;
                }else{
                    this.nameInvalid = false;
                }

                if(this.card.number == null){
                    errors += 1;
                    this.numberInvalid = true;
                }else{
                    this.numberInvalid = false;
                }

                if(this.card.expiry == null){
                    errors += 1;
                    this.expiryInvalid = true;
                }else{
                    this.expiryInvalid = false;
                }

                if(this.card.cvv == null){
                    errors += 1;
                    this.cvvInvalid = true;
                }else{
                    this.cvvInvalid = false;
                }

                if(errors > 0){
                    this.paymentProcess.processPaymentNow = false;
                    return false;
                }else{
                    this.paymentProcess.inputValid = true;
                    return true;
                }
            }
        },

        watch: {
            'paymentProcess.processPaymentNow': function(){
                this.checkInput();
                this.$emit('input', this.paymentProcess.processPaymentNow);
            },

            'paymentProcess.inputValid': function() {
                console.log(this.paymentProcess.inputValid);
                this.$emit('input', this.paymentProcess.inputValid);
            }
        },

        computed: {

        }
    }
</script>