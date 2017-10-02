<template>
  <div id="app">

    <div v-if="visible" id="log-in-form">
      <form class="login-form" v-on:submit.prevent="loginUser" id="form">
        <fieldset>

          <input class="input" id="username" v-model="user.username" type="text" placeholder="Username">

          <input class="input" id="password" v-model="user.password" type="password" placeholder="Password">

          <button id="log-in-button" type="submit" class="pledgr-button">Log In</button>
          <p v-if="submitData">{{submitData|json}}</p>

        </fieldset>
      </form>
    </div>

  <div v-on:click="hideLoginWindow" v-bind:class="[visible ? 'window-open' : '', 'window-close']" class="fade-window"></div>

    <div id="header">
      <h1 id="header-title" class="unselectable">Pledgr</h1>
      <button v-on:click='visible = !visible' v-if="!isLoggedIn" id="log-in">Log in</button>
    </div>

    <router-view></router-view>
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
                visible: false,
                user: {
                    username: null,
                    password: null,
                },
                submitData: null
            }
        },
        mounted: function() {
        },
        methods: {
            loginUser: function() {
                this.submitData = this.user;
            },

            hideLoginWindow: function(){
                this.visible = false;
            }
        },

        computed: {

        }
    }
</script>

