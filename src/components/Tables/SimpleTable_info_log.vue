<template>
  <div>
    <md-table v-model="inWithIndex" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">

        <md-table-cell md-label=""><strong>{{item.Number}}</strong></md-table-cell> 
       
        <md-table-cell md-label="连接时间"><strong>{{ formatTimestamp(item.AccessTime) }}</strong></md-table-cell> 
        <md-table-cell md-label="用户"><strong>{{ item.AccessUser.slice(0, 70) }}...</strong></md-table-cell>
        <!-- <md-table-cell md-label="出价"><strong>{{ item.price }}</strong></md-table-cell> -->
        <!-- <md-table-cell md-label="出价时间"><strong>{{ formatTimestamp(item.date) }}</strong></md-table-cell> -->

        <!-- <md-table-cell md-label="定价" v-if="user.org === transaction.resource.OwnerOrg && transaction.status==='open'"> -->

          <!-- <md-button :disabled="isLoading" style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="Operation_cs(item)"><strong>锁定</strong></md-button> -->

        <!-- </md-table-cell> -->


      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "simple-table-tr-info",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
    machine: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      inWithIndex: [],
      localIns: [],
      user: {},
      isLoading : false,
    };
  },
  methods: {
    formatTimestamp(timestamp) {
      // console.log(timestamp);
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
    fetchData() {
      this.localIns = [...this.machine.AccessLogs];
      this.localIns.reverse();
      this.inWithIndex = this.localIns.map((localIns, index) => ({
        ...localIns,
        Number: index + 1
      }));
    },
  },
  created() {
    this.fetchData();
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
  mounted() {
    this.fetchData();
    this.timer = setInterval(this.fetchData, 10000); 
  },
  beforeDestroy() {
    // 清除定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>