<template>
  <div id="app">

    <div v-if="visible" id="log-in-form">

    </div>

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
                visible: true
            }
        },
        mounted: function() {

        },
        methods: {

        },

        computed: {

        }
    }
</script>

