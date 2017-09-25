<template>
    <div>
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>

        <div id="users">
            <table>
                    <tr v-for="user in users">
                        <td>{{ user.username }}</td>
                        <td> <!--- view link here --></td>
                    </tr>
            </table>

        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                erroe: "",
                errorFlag: false,
                users: []
            }
        },
        mounted: function() {
            this.getUsers();
        },
        methods: {
            getUsers: function(){
                this.$http.get('http://localhost/api/users')
                .then(function(response){
                    this.users = response.data;
                }, function(error) {
                    this.error = error;
                    this.errorFlag = true;
                });
            }
        }
    }
</script>