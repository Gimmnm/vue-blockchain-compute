<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-size-100">
                <form>
                    <md-card>
                    <md-card-header :data-background-color="dataBackgroundColor">
                        <h4 class="title">生成算力</h4>
                        <p class="category">Use the code to create</p>
                    </md-card-header>
    
                    <md-card-content>
                        <div class="md-layout">
                        <p v-show="1==2">{{ machineId }} {{ machineName }}</p>
                        <div class="md-layout-item md-small-size-100 md-size-100">
                            <md-field>
                            <label>Machine Name</label>
                            <md-input v-model="machineName" type="text" readonly></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-100">
                            <md-field>
                            <label>Machine ID</label>
                            <md-input v-model="machineId" tyep="text" readonly></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-90">
                            <md-field>
                            <label>Code</label>
                            <md-input v-model="code" tyep="text" readonly></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-10 text-left">
                            <md-button class="md-raised md-simple" @click="Copy()">Copy</md-button>
                        </div>
                        <div class="md-layout-item md-size-100 text-right">
                            <md-button class="md-raised md-info" @click="Back()">Back</md-button>
                        </div>
                        </div>
                    </md-card-content>
                    </md-card>
                </form>
            </div>
        </div>
    </div>
    </template>

<script>
export default {
    name: "CreateMachineTerminalWithId",
    mounted() {
        this.$axios.get('/api/v1/createresource/' + this.machineName)
            .then(response => {
                if (response.data.message === "error") {
                    this.$toast.error(''+response.data.error);
                }
                this.machineId = response.data.data;
                this.code = "curl " +window.location.protocol +"//"+window.location.host +  "/api/v1/setup/"+ this.machineId + " | bash"
            })
            .catch(error => {
                this.$toast.error(''+error);
            });
    },
    created() {
        if (this.$route.params.Name) {
            this.machineName = this.$route.params.Name;
        }
    },
    data() {
        return {
            machineName: "",
            machineId: "Loading...",
            code: "Loading...",
        };
    },
    methods: {
        Back() {
            this.$router.push({name: "Typography_info", params: { itemId: this.machineId }});
        },
        async Copy() {
            try {
                await navigator.clipboard.writeText(this.code);
                alert('Text copied!');
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    }
};


</script>

<style> 
</style>