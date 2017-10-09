<template>
    <div v-if="!isLoggedIn" id="log-in-form">
        <form class="login-form" v-on:submit.prevent="loginUser" id="form">
            <fieldset>
                <input class="input" id="username" v-model="user.username" type="text" placeholder="Username">

                <input class="input" id="password" v-model="user.password" type="password" placeholder="Password">

                <button id="log-in-button" type="submit" class="pledgr-button button-float">Log In</button>

                <p v-if="errorFlag" id="error-label">username or password incorrect</p>

            </fieldset>
        </form>

        <div v-if="isLoading" class="spinner login">
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
                isLoggedIn: false,
                user: {
                    username: null,
                    password: null,
                },
                submitData: null,
                loginVisible: true,
                isLoading: false
            }
        },
        watch: {
            'isLoggedIn': function() {
                this.$emit('input', this.isLoggedIn);
            }
        },
        methods: {
            loginUser: function() {
                this.isLoading = true;
                this.submitData = this.user;

                this.$http.post(config.apiUrl + "users/login?username=" + this.user.username + "&password=" + this.user.password)
                    .then(function(response){
                        localStorage.setItem('userToken', response.data.token);
                        localStorage.setItem('username', this.user.username);
                        localStorage.setItem('userId', response.data.id);
                        this.isLoggedIn = true;
                        this.isLoading = false;
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                        this.isLoading = false;
                    });
            }
        },

        computed: {

        }
    }
</script>

