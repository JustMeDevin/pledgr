<template>
    <div v-if="createAccountVisible" id="create-account-form">
        <form class="login-form" v-on:submit.prevent="createAccount" id="form">
            <fieldset>


                <input v-bind:class="[usernameInvalid  ? 'invalidInput input' : '', 'input']" id="username" v-model="user.username" type="text" placeholder="Username">

                <input v-bind:class="[emailInvalid  ? 'invalidInput input' : '', 'input']" id="email" v-model="user.email" type="email" placeholder="Email">

                <input class="input" id="location" v-model="user.location" type="text" placeholder="Location">

                <input v-bind:class="[passwordInvalid  ? 'invalidInput input' : '', 'input']" id="password" v-model="user.password" type="password" placeholder="Password">

                <button id="log-in-button" type="submit" class="pledgr-button button-float">Create</button>
            </fieldset>
        </form>

        <div v-if="isLoading" class="spinner accountCreation">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    </div>
</template>

<script>
    import { config } from '../config';

    export default {
        data(){
            return{
                search: '',
                error: "",
                errorFlag: false,
                createAccountVisible: true,
                user: {
                    username: null,
                    password: null,
                    location: null,
                    email: null
                },
                submitData: null,
                usernameInvalid: false,
                locationInvalid: false,
                emailInvalid: false,
                passwordInvalid: false,
                inputValid: true,
                isLoggedIn: false,
                isLoading: false
            }
        },
        watch: {
            'isLoggedIn': function() {
                this.$emit('input', this.isLoggedIn);
            },
            'errorFlag': function(){
                this.emailInvalid = true;
                this.usernameInvalid = true;
                this.isLoading = false;
            }
        },

        mounted: function() {
        },

        methods: {
            createAccount: function() {
                this.submitData = this.user;
                if(this.validateForm()){
                    this.sendUserInfoToServer();
                }
            },

            validateForm: function(){
                var errors = null;
                if(this.user.username == null){
                    this.usernameInvalid = true;
                    errors += 1;
                }else{
                    this.usernameInvalid = false;
                }

                if(this.user.password == null){
                    this.passwordInvalid = true;
                    errors += 1;
                }else{
                    this.passwordInvalid = false;
                }

                if(this.user.location == null){
                    this.locationInvalid = true;
                    errors += 1;
                }else{
                    this.locationInvalid = false;
                }

                if(this.user.email == null){
                    this.emailInvalid = true;
                    errors += 1;
                }else{
                    this.emailInvalid = false;
                }

                if(errors > 0){
                    return false;
                }

                return true;
            },

            sendUserInfoToServer: function (){
                this.isLoading = true;
                var data = JSON.stringify(this.user);

                this.$http.post(config.apiUrl + "users", data)
                    .then(function(response){
                        console.log(response.data)
                        this.logUserIn();

                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },

            logUserIn: function(){
                this.$http.post(config.apiUrl + "users/login?username=" + this.user.username + "&password=" + this.user.password)
                    .then(function(response){
                        localStorage.setItem('userToken', response.data.token);
                        localStorage.setItem('username', this.user.username);
                        this.isLoggedIn = true;
                        this.isLoading = false;
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            }
        },

        computed: {

        }
    }
</script>

