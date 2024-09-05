<template>
  <div>

    <div v-if="ifNothing" class="entered-container"><h3><strong>暂无买家</strong></h3> </div>

    <md-table v-if="!ifNothing" v-model="buyersWithIndex" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">

        <md-table-cell md-label="" class="number-column"><strong>{{item.Number}}</strong></md-table-cell> 
        
        <md-table-cell md-label="买家"><strong>{{ item.org }}</strong></md-table-cell>
        <md-table-cell md-label="出价"><strong>{{ item.price }}</strong></md-table-cell>
        <md-table-cell md-label="出价时间"><strong>{{ formatTimestamp(item.date) }}</strong></md-table-cell>

        <md-table-cell md-label="结果">
          <strong v-if="item.org === transaction.winner">
            Winner
          </strong>
          <strong v-else>
            /
          </strong>
        </md-table-cell> 

        <md-table-cell md-label="定价" v-if="user.org === transaction.resource.OwnerOrg && transaction.status==='open'">

          <md-button :disabled="isLoading" style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="Operation_cs(item)"><strong>锁定</strong></md-button>

        </md-table-cell>


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
    transaction: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      buyersWithIndex: [],
      user: {},
      isLoading : false,
      buyerss: [],
      ifNothing: false,
    };
  },
  methods: {
    Operation_cs(item) {
      this.isLoading = true;
      // console.log('/api/v1/market/lock/'+ this.transaction.id + '/' + item.org + '/' + item.price);
      this.$axios.get('/api/v1/market/lock/'+ this.transaction.id + '/' + item.org + '/' + item.price)
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
        window.location.reload();
      });
    },
    showInformation(item) {
      // this.$router.push({name: "Typography_jy_info", params: { itemId: item.id }});
    },
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
      this.buyerss = Object.values(this.transaction.buyers).map((buyer, index) => ({
        ...buyer,
      }));
      this.buyerss.sort((a, b) => {
        if (a.org === transaction.winner) {
          return -1;
        }
        if (b.org === transaction.winner) {
          return 1;
        }
        return a.price - b.price;
      })
      this.buyersWithIndex = this.buyerss.map((buyerss, index) => ({
        ...buyerss,
        Number: index + 1
      }));
      if (this.buyersWithIndex.length === 0) {
        this.ifNothing = true;
      } else {
        this.ifNothing = false;
      }
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
<style scoped>
.centered-container {
  display: flex !important;
  justify-content: center !important; /* 水平居中 */
  align-items: center !important; /* 垂直居中 */
}
.number-column {
  flex-basis: 30px !important; /* 设置初始宽度为 50px */
  flex-grow: 0 !important;     /* 不允许扩展 */
  flex-shrink: 0 !important;   /* 不允许缩小 */
}
</style>