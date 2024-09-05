<!-- <template>
<div class="content">
    <div class="md-layout">
        <div class="md-layout-item md-medium-size-100 md-size-100">
            <form>
                <md-card>
                <md-card-header :data-background-color="dataBackgroundColor">
                    <h4 class="title">Edit Profile</h4>
                    <p class="category">Complete your profile</p>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                        <label>Company (disabled)</label>
                        <md-input v-model="disabled" disabled></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                        <label>User Name</label>
                        <md-input v-model="username" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                        <label>Email Address</label>
                        <md-input v-model="emailadress" type="email"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                        <label>First Name</label>
                        <md-input v-model="firstname" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                        <label>Last Name</label>
                        <md-input v-model="lastname" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <md-field>
                        <label>Adress</label>
                        <md-input v-model="address" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                        <label>City</label>
                        <md-input v-model="city" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                        <label>Country</label>
                        <md-input v-model="country" type="text"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                        <label>Postal Code</label>
                        <md-input v-model="code" type="number"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <md-field maxlength="5">
                        <label>About Me</label>
                        <md-textarea v-model="aboutme"></md-textarea>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100 text-right">
                        <md-button class="md-raised md-success">Update Profile</md-button>
                    </div>
                    </div>
                </md-card-content>
                </md-card>
            </form>
        </div>
    </div>
</div>
</template> -->

<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-size-100">
                <form>
                    <md-card>
                    <md-card-header :data-background-color="dataBackgroundColor">
                        <h4 class="title">Create New Machine</h4>
                        <p class="category">Enter details of the new machine</p>
                    </md-card-header>
    
                    <md-card-content>
                        <div class="md-layout">
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                            <label>Machine Name</label>
                            <md-input v-model="machineName" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                            <label>Machine Type</label>
                            <md-input v-model="machineType" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                            <label>Operating System</label>
                            <md-input v-model="os" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                            <label>CPU Configuration</label>
                            <md-input v-model="cpuConfig" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                            <label>Memory (GB)</label>
                            <md-input v-model="memory" type="number"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                            <label>Storage (GB)</label>
                            <md-input v-model="storage" type="number"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-100">
                            <md-field>
                            <label>Description</label>
                            <md-textarea v-model="description"></md-textarea>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-100 text-right">
                            <md-button class="md-raised md-success">Create Machine</md-button>
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
    name: "CreateMachineBlank",
    // data() {
    //     return {
    //         username: null,
    //         disabled: null,
    //         emailadress: null,
    //         lastname: null,
    //         firstname: null,
    //         address: null,
    //         city: null,
    //         country: null,
    //         code: null,
    //         aboutme:
    //             "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.",
    //     };
    // }
    data() {
        return {
            machineName: '',
            machineType: '',
            os: '',
            cpuConfig: '',
            memory: null,
            storage: null,
            description: ''
        };
    }
};


</script>

<style> 
</style>