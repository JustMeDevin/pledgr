<template>
    <div>

        <div v-if="!image">

            <div id="selector-overlay">
                <div id="selector-faded">
                    <img id="camera-image" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMCAxMDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNTAsNDBjLTguMjg1LDAtMTUsNi43MTgtMTUsMTVjMCw4LjI4NSw2LjcxNSwxNSwxNSwxNWM4LjI4MywwLDE1LTYuNzE1LDE1LTE1ICAgIEM2NSw0Ni43MTgsNTguMjgzLDQwLDUwLDQweiBNOTAsMjVINzhjLTEuNjUsMC0zLjQyOC0xLjI4LTMuOTQ5LTIuODQ2bC0zLjEwMi05LjMwOUM3MC40MjYsMTEuMjgsNjguNjUsMTAsNjcsMTBIMzMgICAgYy0xLjY1LDAtMy40MjgsMS4yOC0zLjk0OSwyLjg0NmwtMy4xMDIsOS4zMDlDMjUuNDI2LDIzLjcyLDIzLjY1LDI1LDIyLDI1SDEwQzQuNSwyNSwwLDI5LjUsMCwzNXY0NWMwLDUuNSw0LjUsMTAsMTAsMTBoODAgICAgYzUuNSwwLDEwLTQuNSwxMC0xMFYzNUMxMDAsMjkuNSw5NS41LDI1LDkwLDI1eiBNNTAsODBjLTEzLjgwNywwLTI1LTExLjE5My0yNS0yNWMwLTEzLjgwNiwxMS4xOTMtMjUsMjUtMjUgICAgYzEzLjgwNSwwLDI1LDExLjE5NCwyNSwyNUM3NSw2OC44MDcsNjMuODA1LDgwLDUwLDgweiBNODYuNSw0MS45OTNjLTEuOTMyLDAtMy41LTEuNTY2LTMuNS0zLjVjMC0xLjkzMiwxLjU2OC0zLjUsMy41LTMuNSAgICBjMS45MzQsMCwzLjUsMS41NjgsMy41LDMuNUM5MCw0MC40MjcsODguNDMzLDQxLjk5Myw4Ni41LDQxLjk5M3oiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
                    <p id="add-image-text">Add Image</p>
                    <input type="file" @change="onFileChange" accept="image/*" class="input-file">
                </div>

                <img id="project-image-filler" img :src="getImage()" v-bind:alt="this.$route.params.projectId" onerror="this.style.display='none'">

            </div>

        </div>
        <div v-else>
            <div id="remove-image">
            </div>
            <img @click="removeImage" id="added-project-image" :src="image" />
        </div>
    </div>

</template>
<script>

    import { config } from '../config';
    export default {

        props: ['uploadImage'],
        data() {
            return {
                image: null,
                displayImage: null
            }
        },
        mounted: function(){
        },

        methods: {
            getImage: function(){
                return config.apiUrl + "projects/" + this.$route.params.projectId + "/image";
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
                this.uploadImage.type = files[0].type;
                this.uploadImage.image = files[0];
            },
            createImage(file) {
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;

                    this.$emit('input', this.uploadImage);
                };

                reader.readAsDataURL(file);
            },
            removeImage: function (e) {
                this.image = '';
            },
        },
        mounted: function(){
        }

    }
</script>