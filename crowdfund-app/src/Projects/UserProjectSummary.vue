<template>
    <div id="user-project-summary" class="float">
        <close-project v-if="closeVisible.isVisible && isCreator && project.open" :closeVisible="closeVisible" :project="project"></close-project>
        <project-status :closeVisible="closeVisible" :project="project"></project-status>
        <project-summary :project="project"></project-summary>
    </div>

</template>

<script>
    import { config } from '../config';
    import ProjectSummary from './ProjectSummary.vue';
    import ProjectStatus from './ProjectStatus.vue';
    import CloseProject from './CloseProject.vue';


    export default {
        props: ['project', 'isCreator'],
        data(){
            return{
                search: '',
                error: "",
                errorFlag: false,
                closeVisible: {
                    isVisible: false,
                    projectClosed: false
                }
            }
        },
        components: {
            ProjectSummary,
            ProjectStatus,
            CloseProject
        },
        mounted: function() {

        },
        watch: {
            'closeVisible.projectClosed': function(){
                this.closeVisible.isVisible = false;
                this.project.open = false;
            }
        },
        methods: {
        },

        computed: {

        }
    }
</script>

