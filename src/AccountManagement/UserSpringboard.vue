<template>
    <div v-if="springboardVisible" id="user-springboard">
        <div id="springboard-button-wrapper">
            <router-link :to="{name: 'createProject'}" id="create-project" class="springboard-button pledgr-button button-float" tag="button">new project</router-link>
            <router-link :to="{name: 'myProjects'}" id="my-project" class="springboard-button pledgr-button button-float" tag="button">my projects</router-link>
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
                springboardVisible: true
            }
        },
        watch: {

        },
        methods: {
        },

        computed: {

        }
    }
</script>

