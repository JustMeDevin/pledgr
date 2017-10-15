<template>
  <div id="app">

    <login v-model="isLoggedIn" v-bind:class="[loginVisible ? 'pane-visible' : 'pane-invisible']"></login>

    <create-account v-model="isLoggedIn" v-bind:class="[createAccountVisible ? 'pane-visible' : 'pane-invisible']"></create-account>

    <user-springboard v-bind:class="[springboardVisible ? 'pane-visible' : 'pane-invisible']"> </user-springboard>

    <div v-on:click="hideLoginWindow" v-bind:class="[fadeContent ? 'window-open' : '', 'window-close']" class="fade-window"></div>

    <div v-bind:class="[fadeContent  ? 'dark-dropshadow blurred': 'blurred', 'light-dropshadow']" id="header">
      <router-link :to="{path: '/'}" id="header-title" class="unselectable" tag="h1">Pledgr</router-link>

      <div id="header-button-wrapper">
        <button v-on:click='showLoginWindow' v-if="!isLoggedIn" id="log-in">Log in</button>
        <button v-on:click='showCreateAccountWindow'  v-if="!isLoggedIn" id="create-account">Create account</button>
        <button v-if="isLoggedIn" v-on:click='showSpringboard' id="account-name">{{ username }}</button>
        <button v-if="isLoggedIn" v-on:click='logUserOut' id="log-out">log out</button>
      </div>
    </div>

    <router-view></router-view>

  </div>
</template>

<script>
    import { config } from './config';
    import CreateAccount from './AccountManagement/CreateAccount.vue';
    import Login from './AccountManagement/Login.vue';
    import UserSpringboard from './AccountManagement/UserSpringboard.vue';

    export default {
        data(){
            return{
                search: '',
                error: "",
                errorFlag: false,
                isLoggedIn: false,
                loginVisible: false,
                createAccountVisible: false,
                fadeContent: false,
                username: null,
                springboardVisible: false,
            }
        },
        components: {
            CreateAccount,
            Login,
            UserSpringboard
        },

        mounted: function() {

            if(localStorage.getItem('userToken')){
                this.isLoggedIn = true;
            }

        },
        watch: {
            'isLoggedIn': function() {
                this.fadeContent = false;
                this.loginVisible = false;
                this.createAccountVisible = false;
                this.username = localStorage.getItem('username');
            },
            '$route.name': function(){
                if(this.$route.name == "myProjects" || this.$route.name == "createProject"){
                    this.springboardVisible = !this.springboardVisible;
                    this.fadeContent = !this.fadeContent;
                }

            }
        },
        methods: {
            hideLoginWindow: function(){
                this.loginVisible = false;
                this.createAccountVisible = false;
                this.springboardVisible = false;
                this.fadeContent = false;
            },
            showCreateAccountWindow: function(){
                if(this.loginVisible == true){
                    this.loginVisible = false;
                }else{
                    this.fadeContent = !this.fadeContent;
                }
                this.createAccountVisible = !this.createAccountVisible;
            },
            showLoginWindow: function(){
                if(this.createAccountVisible == true){
                    this.createAccountVisible = false;
                }else{
                    this.fadeContent = !this.fadeContent;
                }
                this.loginVisible = !this.loginVisible;
            },
            showSpringboard: function(){
                this.springboardVisible = !this.springboardVisible;
                this.fadeContent = !this.fadeContent;
            },

            logUserOut: function(){
                this.springboardVisible = false;
                this.fadeContent = false;
                this.$http.post(config.apiUrl + "users/logout", {}, {
                    headers: {
                        'X-Authorization': localStorage.getItem('userToken')}
                    })
                    .then(function(response){
                        this.isLoggedIn = false;
                        localStorage.removeItem('userToken');
                        localStorage.removeItem('username');
                        localStorage.removeItem('userId');

                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                        this.isLoggedIn = false;
                        localStorage.removeItem('userToken');
                        localStorage.removeItem('username');
                        localStorage.removeItem('userId');
                    });
            }
        },

        computed: {

        }
    }
</script>

