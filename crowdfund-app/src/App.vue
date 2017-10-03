<template>
  <div id="app">

    <login v-if="loginVisible"></login>

    <create-account v-if="createAccountVisible"></create-account>

    <div v-on:click="hideLoginWindow" v-bind:class="[fadeContent ? 'window-open' : '', 'window-close']" class="fade-window"></div>

    <div v-bind:class="[fadeContent  ? 'dark-dropshadow' : '', 'light-dropshadow']" id="header">
      <h1 id="header-title" class="unselectable">Pledgr</h1>
      <div id="header-button-wrapper">
        <button v-on:click='showLoginWindow' v-if="!isLoggedIn" id="log-in">Log in</button>
        <button v-on:click='showCreateAccountWindow'  v-if="!isLoggedIn" id="create-account">Create account</button>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
    import { config } from './config';
    import CreateAccount from './CreateAccount.vue'
    import Login from './Login.vue'

    export default {
        data(){
            return{
                search: '',
                error: "",
                errorFlag: false,
                isLoggedIn: false,
                loginVisible: false,
                createAccountVisible: false,
                fadeContent: false
            }
        },
        components: {
            CreateAccount,
            Login
        },

        mounted: function() {
        },
        methods: {
            hideLoginWindow: function(){
                this.loginVisible = false;
                this.createAccountVisible = false;
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

            }
        },

        computed: {

        }
    }
</script>

