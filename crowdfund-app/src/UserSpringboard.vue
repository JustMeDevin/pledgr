<template>
    <div v-if="springboardVisible" id="user-springboard">
        <div id="springboard-button-wrapper">
            <button id="create-project" class="pledgr-button springboard-button button-float">new project</button>
            <button id="view-user-projects" class="pledgr-button springboard-button button-float">my projects</button>
        </div>
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

