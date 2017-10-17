<template>
    <div id="close-project-wrapper">
            <button v-on:click="hideButtons" id="cancel-close-project" class="pledgr-button close-project-button">cancel</button>
            <button v-on:click="closeProject" id="confirm-close-project" class="pledgr-button close-project-button">close</button>
    </div>
</template>
<script>
    import { config } from '../config';
    import ProjectSummary from './ProjectSummary.vue';
    import ProjectStatus from './ProjectStatus.vue';

    export default {
        props: ['project', 'closeVisible'],
        data(){
            return{
                status: null
            }
        },
        components: {
        },
        mounted: function() {
        },
        methods: {
            closeProject: function(){
                var header = {
                    headers: {
                        'X-Authorization': localStorage.getItem('userToken')}
                };

                var body =  {
                    "open": false
                };

                body = JSON.stringify(body);

                this.$http.put(config.apiUrl + "projects/" + this.project.id, body, header)
                    .then(function(response){
                        if(response.ok == true){
                            this.closeVisible.projectClosed = true;
                            this.$emit('input', this.closeVisible.projectClosed);
                        }
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            hideButtons: function(){
                this.closeVisible.isVisible = false;
                this.$emit('input', this.closeVisible.isVisible);
            }
        }
    }
</script>