<template>
    <div id="user-project-summary" class="float">
        <project-status :project="project"></project-status>
        <project-summary :project="project"></project-summary>
    </div>

</template>

<script>
    import { config } from '../config';
    import ProjectSummary from './ProjectSummary.vue';
    import ProjectStatus from './ProjectStatus.vue';

    export default {
        props: ['project'],
        data(){
            return{
                search: '',
                error: "",
                errorFlag: false,
            }
        },
        components: {
            ProjectSummary,
            ProjectStatus
        },
        mounted: function() {

        },
        watch: {

        },
        methods: {
        },

        computed: {

        }
    }
</script>

