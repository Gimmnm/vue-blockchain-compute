<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" >
        <md-card>
            <md-card-header data-background-color="gray">
              <h1 class="title"><strong>{{ transaction.resource.Name }}</strong></h1>
              <md-button :disabled="isLoading" v-if="user.org !== transaction.resource.OwnerOrg && transaction.status === 'open'" style="padding: 5px 5px; min-width: 10px;" class="md-lg md-simple" @click="Price()">
                <strong>出价</strong>
              </md-button>
              <!-- <md-button style="padding: 5px 5px; min-width: 10px;" class="md-lg md-simple" @click="Delete()">
                <strong>Delete</strong>
              </md-button> -->
              <md-button :disabled="isLoading" v-if="transaction.status === 'locked' && user.org === transaction.resource.OwnerOrg" style="padding: 5px 5px; min-width: 10px;" class="md-lg md-simple" @click="Endtr()">
                <strong>Finish</strong>
              </md-button>
              <md-button :disabled="isLoading" v-if="user.org === transaction.resource.OwnerOrg" style="padding: 5px 5px; min-width: 10px;" class="md-lg md-simple" @click="Deltr()">
                <strong>Delete</strong>
              </md-button>
              <md-button :disabled="isLoading" style="padding: 5px 5px; min-width: 10px;" class="md-lg md-simple" @click="Back()">
                <strong>Back</strong>
              </md-button>
              <p class="category">
                <span style="float: left; width: 100%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong style="font-family: Arial, sans-serif;">Id:</strong>{{ transaction.id }}</span>
                <br>
                <span style="float: left; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong style="font-family: Arial, sans-serif;">State</strong>: {{transaction.status}}</span> 
                <span style="float: right; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong  style="font-family: Arial, sans-serif;">Release Time</strong>: {{ formatTimestamp(transaction.date)  }} </span>
                <br>
                <span style="float: left; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong style="font-family: Arial, sans-serif;">价格</strong>: {{transaction.price}}</span> 
                <span style="float: right; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong  style="font-family: Arial, sans-serif;">租用时间</strong>: {{ transaction.duration}} </span>
                <br>
                <span style="float: left; width: 100%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong  style="font-family: Arial, sans-serif;">算力Id</strong>: {{transaction.resource.Id}}</span> 
                <br>
                <span style="float: left; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong style="font-family: Arial, sans-serif;">OwnerOrg</strong>: {{transaction.resource.OwnerOrg}}</span> 
                <span style="float: right; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong  style="font-family: Arial, sans-serif;">Os</strong>: {{ transaction.resource.Details.os }} </span>
                <br>
                <span style="float: left; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;" ><strong  style="font-family: Arial, sans-serif;">Arch</strong>: {{transaction.resource.Details.arch}}</span> 
                <span style="float: right; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong  style="font-family: Arial, sans-serif;">CPU</strong>: {{ transaction.resource.Details.cpusku }} </span>
                <br>
                <span style="float: left; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong style="font-family: Arial, sans-serif;">CPU cores</strong>: {{transaction.resource.Details.cpucores}}</span> 
                <span style="float: right; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong  style="font-family: Arial, sans-serif;">CPU Sockets</strong>: {{ transaction.resource.Details.cpusockets}} </span>
                <br>
                <span style="float: left; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong style="font-family: Arial, sans-serif;">GPU</strong>: {{transaction.resource.Details.gpu}}</span> 
                <span style="float: right; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong style="font-family: Arial, sans-serif;">GPU Number</strong>: {{ transaction.resource.Details.gpunums}} </span>
                <br>
                <span style="float: left; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong style="font-family: Arial, sans-serif;">Network</strong>: {{transaction.resource.Details.network}}</span> 
                <span style="float: right; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong style="font-family: Arial, sans-serif;">IP</strong>: {{ transaction.resource.Details.ip}} </span>
                <br>
                <span style="float: left; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong style="font-family: Arial, sans-serif;">Ram</strong>: {{transaction.resource.Details.ram}}</span> 
                <span style="float: right; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong  style="font-family: Arial, sans-serif;">Hostname</strong>: {{ transaction.resource.Details.hostname}} </span>
                <br>
                <span style="float: left; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong style="font-family: Arial, sans-serif;">Winner</strong>: {{transaction.winner}}</span> 
                <span style="float: left; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong style="font-family: Arial, sans-serif;">Buyer Number</strong>: {{ Object.keys(transaction.buyers).length}}</span>  
                <br>
              </p>
            </md-card-header>
            <!-- <hr> -->
            <!-- <md-card-content>
              <SimpleTable_tr_info :transaction="transaction"></SimpleTable_tr_info>
            </md-card-content> -->
        </md-card>
      </div>


      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" >
        <md-card class="centered-container">
            <!-- <md-card-header data-background-color="gray">
              <p class="category">
              </p>
            </md-card-header> -->
            <!-- <hr> -->
            <md-card-content>
              <SimpleTable_tr_info :transaction="transaction"></SimpleTable_tr_info>
            </md-card-content>
        </md-card>
      </div>


    </div>
  </div>
</template>

<script>

import SimpleTable_tr_info from '../components/Tables/SimpleTable_tr_info.vue';

export default {
  components: {
    SimpleTable_tr_info,
  },
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  methods: {
    Endtr() {
      this.isLoading = true;
      this.$axios.get('/api/v1/market/end/' + this.transaction.id)
      .then(response => {
        if (response.data.message === "error") {
          this.$toast.error(''+response.data.error);
        }
      })
      .catch(error => {
        this.$toast.error(''+error);
      })
      .finally(() => {
        this.isLoading = false;
        this.$router.push("/table_tr");
      });
    },  
    Deltr() {
      this.isLoading = true;
      this.$axios.get('/api/v1/market/delete/' + this.transaction.id)
      .then(response => {
        if (response.data.message === "error") {
          this.$toast.error(''+response.data.error);
        }
      })
      .catch(error => {
        this.$toast.error(''+error);
      })
      .finally(() => {
        this.isLoading = false;
        this.$router.push("/table_tr");
      }); 
    },
    Back() {
      this.$router.push("/table_tr");
    },
    Delete() {
    },
    Price() {
      console.log("hello");
      this.$router.push({name: "Typography_cj", params:{itemId: this.trId}});
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp / 1000); // 将微秒转换为毫秒
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    },
  },
  created() {
    this.$axios.get('/api/v1/market/get/'+this.trId)
      .then(response => {
        if (response.data.message === "error") {
          this.$toast.error(''+response.data.error);
        }
        this.transaction = JSON.parse(response.data.data);
        console.log(this.transaction);
      })
      .catch(error => {
        this.$toast.error(''+error);
      });

    this.$axios.get('/api/v1/whoami/')
      .then(response => {
        if (response.data.message === "error") {
          this.$toast.error(''+response.data.error);
        }
        this.user = JSON.parse(response.data.data);
        console.log(this.machine);
      })
      .catch(error => {
        this.$toast.error(''+error);
      });
  },
  data() {
    return {
      trId: this.$route.params.itemId,
      transaction: {},
      user: {},
      isLoading : false,
    };
  },
};
</script>
<style scoped>
.overlay-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 80%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.flex-container {
  display: flex;
  align-items: center;  /* 垂直居中子元素 */
}
.title {
  margin-right: 10px;  /* 在标题和按钮之间添加一些间距 */
}
pre {
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  padding: 10px;
  overflow: auto;
}
code {
  color: #d63384;
}

.centered-container {
  display: flex !important;
  justify-content: center !important; /* 水平居中 */
  align-items: center !important; /* 垂直居中 */
}
</style>