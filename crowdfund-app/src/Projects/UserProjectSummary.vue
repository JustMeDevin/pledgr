<template>
    <div id="user-project-summary" class="float">
        <div id="project-status-indicator" v-bind:class="[project.open ? 'indicator-open' : 'indicator-closed']">{{ status }}</div>
        <project-summary :project="project"></project-summary>
    </div>

</template>

<script>
    import { config } from '../config';
    import ProjectSummary from './ProjectSummary.vue';

    export default {
        props: ['project'],
        data(){
            return{
                search: '',
                error: "",
                errorFlag: false,
                status: null
            }
        },
        components: {
            ProjectSummary
        },
        mounted: function() {
            if(this.project.open){
                this.status = 'open';
            }else{
                this.status = 'closed';
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

