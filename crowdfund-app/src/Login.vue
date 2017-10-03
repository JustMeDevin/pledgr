<template>
    <div v-if="loginVisible" id="log-in-form">
        <form class="login-form" v-on:submit.prevent="loginUser" id="form">
            <fieldset>
                <input class="input" id="username" v-model="user.username" type="text" placeholder="Username">

                <input class="input" id="password" v-model="user.password" type="password" placeholder="Password">

                <button id="log-in-button" type="submit" class="pledgr-button">Log In</button>

                <p v-if="errorFlag" id="error-label">password/username is incorrect</p>

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
                isLoggedIn: false,
                user: {
                    username: null,
                    password: null,
                },
                submitData: null,
                loginVisible: true
            }
        },
        methods: {
            loginUser: function() {
                this.submitData = this.user;

                this.$http.post(config.apiUrl + "users/login?username=" + this.user.username + "&password=" + this.user.password)
                    .then(function(response){
                        console.log(response.data)
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

