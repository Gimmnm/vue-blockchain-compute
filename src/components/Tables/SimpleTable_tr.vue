<template>
  <div>
    <md-table v-model="transactionWithIndex" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">

        <md-table-cell md-label=""><strong>{{item.Number}}</strong></md-table-cell> 
        
        <!-- <md-table-cell md-label="算力名称" ><md-button style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="showInformation(item)"><strong>{{ item.Name }}</strong></md-button></md-table-cell> -->

        <md-table-cell md-label="交易Id"><strong>{{ item.id.slice(0, 15)+"..." }}</strong></md-table-cell>

        <md-table-cell md-label="状态"><strong>{{ item.status }}</strong></md-table-cell> 

        <md-table-cell md-label="CPU"><strong>{{ item.resource.Details.cpusku }}</strong></md-table-cell> 
        <md-table-cell md-label="GPU">
          <strong v-if="item.resource.Details.gpu !==''">{{ item.resource.Details.gpu.slice(0, 60) }}...</strong>
          <strong v-else>/</strong>
        </md-table-cell> 
        <md-table-cell md-label="OwnerOrg"><strong>{{ item.ownerOrg }}</strong></md-table-cell> 
        <md-table-cell md-label="买家数量"><strong>{{ Object.keys(item.buyers).length }}</strong></md-table-cell> 
        <md-table-cell md-label="价格"><strong>{{ item.price }}</strong></md-table-cell> 
        <md-table-cell md-label="租用时长"><strong>{{ formatDuration(item.duration) }}</strong></md-table-cell> 
        <md-table-cell md-label="发布时间"><strong>{{ formatTimestamp(item.date) }}</strong></md-table-cell> 
        

        <!-- <md-table-cell md-label="所属组织"><strong>{{ item.OwnerOrg }}</strong></md-table-cell>
        
        <md-table-cell md-label="使用者组织"><strong>{{ item.UserOrg }}</strong></md-table-cell> -->

        <md-table-cell md-label="操作">
          <md-button style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="showInformation(item)"><strong>详情</strong></md-button>

          <!-- <md-button style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="Operation_xf(item)"><strong>续费</strong></md-button> -->
          <!-- <md-button style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="Operation_jx(item)"><strong> 解析</strong></md-button> -->
          <!-- <md-button v-if="item.State !== 'unverifieds'" style="padding: 4px 3px; min-width: 0px; color: blue;" class="md-sm md-simple" @click="Connection(item)"><strong>连接</strong></md-button>
          
          <md-button v-if="item.State !== 'unverifieds'" style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="showInformation(item)"><strong>管理</strong></md-button> -->

          <!-- <md-button style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="Operation_gl(item)"><strong> 管理</strong></md-button> -->
          <!-- <md-button v-if="item.State==='normal'" style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="Operation_jy(item)"><strong>发布交易</strong></md-button>

          <md-button v-if="item.State==='unverifieds'" style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="replaceMachine(item)"><strong>收回算力</strong></md-button> -->

        </md-table-cell>


      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "simple-table-tr",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
    transactions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: [],
      localTransactions: [],
      transactionWithIndex: [],
    };
  },
  methods: {
    showInformation(item) {
      this.$router.push({name: "Typography_jy_info", params: { itemId: item.id }});
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
    formatDuration(milliseconds) {
      milliseconds /= 1000;
        if (milliseconds < 1000) {
            return `${milliseconds} 毫秒`;
        } else if (milliseconds < 60000) {
            return `${(milliseconds / 1000).toFixed(1)} 秒`;
        } else if (milliseconds < 3600000) {
            return `${(milliseconds / 60000).toFixed(1)} 分钟`;
        } else if (milliseconds < 86400000) {
            return `${(milliseconds / 3600000).toFixed(1)} 小时`;
        } else {
            return `${(milliseconds / 86400000).toFixed(1)} 天`;
        }
    },
    fetchData() {
      this.localTransactions = [...this.transactions];
      this.transactionWithIndex = this.localTransactions.map((localTransactions, index) => ({
        ...localTransactions,
        Number: index + 1
      }));
      console.log(this.transactionWithIndex);
    },
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