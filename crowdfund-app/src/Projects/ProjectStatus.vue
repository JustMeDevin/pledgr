<template>
    <button id="project-status-indicator" v-bind:class="[project.open ? 'indicator-open' : 'indicator-closed']">{{ status }}</button>
</template>
<script>
    import { config } from '../config';
    import ProjectSummary from './ProjectSummary.vue';
    import ProjectStatus from './ProjectStatus.vue';

    export default {
        props: ['project'],
        data(){
            return{
                status: null
            }
        },
        components: {
        },
        mounted: function() {
            if(this.project.open){
                this.status = 'open';
            }else{
                this.status = 'closed';
            }
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

                        }
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            }
        }
    }
</script>