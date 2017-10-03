<template>
    <div v-if="loginVisible" id="create-account-form">
        <form class="login-form" v-on:submit.prevent="createAccount" id="form">
            <fieldset>

                <input class="input" id="username" v-model="user.username" type="text" placeholder="username">

                <input class="input" id="email" v-model="user.email" type="text" placeholder="email">

                <input class="input" id="location" v-model="user.location" type="text" placeholder="location">

                <input class="input" id="password" v-model="user.password" type="password" placeholder="password">

                <button id="log-in-button" type="submit" class="pledgr-button">Create</button>

                <p v-if="errorFlag" id="error-label">passwords do not match</p>

            </fieldset>
        </form>
    </div>
</template>

<script>
    import { config } from './config';

    export default {
        data(){
            return{
                search: '',
                error: "",
                errorFlag: false,
                loginVisible: true,
                user: {
                    username: null,
                    password: null,
                    location: null,
                    email: null
                },
                submitData: null
            }
        },
        mounted: function() {
        },
        methods: {
            createAccount: function() {
                this.submitData = this.user;

                this.$http.post(config.apiUrl + "users/login?username=" + this.user.username + "&password=" + this.user.password)
                    .then(function(response){
                        console.log(response.data)
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },

            hideLoginWindow: function(){
                this.loginVisible = false;
            }
        },

        computed: {

        }
    }
</script>

