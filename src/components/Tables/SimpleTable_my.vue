<template>
  <div>
    <md-table v-model="machineWithIndex" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">

        <md-table-cell md-label=""><strong>{{item.Number}}</strong></md-table-cell> 
        
        <md-table-cell md-label="名称" ><md-button :disabled="isLoading" style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="showInformation(item)"><strong>{{ item.Name }}</strong></md-button></md-table-cell>

        <md-table-cell md-label="Id"><strong>{{ item.Id.slice(0, 15)+"..." }}</strong></md-table-cell>

        <md-table-cell md-label="状态"><strong>{{ item.State }}</strong></md-table-cell> 

        <md-table-cell md-label="IP"><strong>{{ item.Details.ip }}</strong></md-table-cell>  

        <md-table-cell md-label="系统"><strong>{{ item.Details.os }}</strong></md-table-cell> 

        <!-- <md-table-cell md-label="所属组织"><strong>{{ item.OwnerOrg }}</strong></md-table-cell>
        
        <md-table-cell md-label="使用者组织"><strong>{{ item.UserOrg }}</strong></md-table-cell> -->

        <md-table-cell md-label="操作">
          <!-- <md-button style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="Operation_xf(item)"><strong>续费</strong></md-button> -->
          <!-- <md-button style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="Operation_jx(item)"><strong> 解析</strong></md-button> -->
          <md-button :disabled="isLoading" v-if="item.State === 'normal'" style="padding: 4px 3px; min-width: 0px; color: blue;" class="md-sm md-simple" @click="Connection(item)"><strong>连接</strong></md-button>
          
          <md-button :disabled="isLoading" v-if="item.State !== 'rented'" style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="showInformation(item)"><strong>管理</strong></md-button>

          <!-- <md-button style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="Operation_gl(item)"><strong> 管理</strong></md-button> -->
          <md-button :disabled="isLoading" v-if="item.State==='normal'" style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="Operation_jy(item)"><strong>发布交易</strong></md-button>

          <md-button :disabled="isLoading || item.State === 'rented' && item.UserOrgDueDate >= Date.now() * 1000"  style="padding: 4px 3px; min-width: 0px;" class="md-sm md-simple" @click="replaceMachine(item)"><strong v-if="item.State==='rented' && item.UserOrgDueDate < Date.now() * 1000">收回算力</strong> <p v-if="item.State === 'rented' && item.UserOrgDueDate >= Date.now() * 1000" style="font-size: 12px;"><strong>到期时间</strong>:{{ formatTimestamp(item.UserOrgDueDate) }}</p></md-button>    

        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
    machines: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: [],
      localMachines: [],
      machineWithIndex: [],
      isLoading: false,
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
    showInformation(item) {
      this.$router.push({name: "Typography_info", params: { itemId: item.Id }});
    },
    // Operation_jx(item) {
    //   this.$router.push({name: "Typography_jx", params: { itemId: item.id }});
    // },
    Operation_gl(item) {
      this.$router.push({name: "Typography_gl", params: { itemId: item.Id }});
    },
    Operation_jy(item) {
      this.$router.push({name: "Typography_jy", params: { itemId: item.Id }});
    },
    Operation_xf(item) {
      this.$router.push({name: "Typography_xf", params: { itemId: item.Id }});
    },
    Connection(item) {
      this.$router.push({name: "Terminal", params: { itemId: item.Id }});
    },
    replaceMachine(item) {
      this.isLoading = true;
      this.$axios.get('/api/v1/claimresource/' + item.Id)
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
  },
  mounted() {
    console.log(Date.now());
    this.localMachines = [...this.machines];
    this.machineWithIndex = this.localMachines.map((localMachines, index) => ({
      ...localMachines,
      Number: index + 1
    }));
    console.log(this.machineWithIndex[1].UserOrgDueDate);
  }
};
</script>