<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" >

          <md-card>
            <md-card-header data-background-color="gray">
              <div class="flex-container">
                <h1 class="title"><strong>{{ machine.Name }}</strong></h1>
                <md-button style="padding: 5px 5px; min-width: 10px;" class="md-lg md-simple" @click="Connection(machineId)">
                  <strong>Connection</strong>
                </md-button>
                <md-button style="padding: 5px 5px; min-width: 10px;" class="md-lg md-simple" @click="Delete()">
                  <strong>Delete</strong>
                </md-button>
                <md-button style="padding: 5px 5px; min-width: 10px;" class="md-lg md-simple" @click="Code()">
                  <strong>Code</strong>
                </md-button> 
                <md-button style="padding: 5px 5px; min-width: 10px;" class="md-lg md-simple" @click="Back()">
                  <strong>Back</strong>
                </md-button>
              </div>
              <div v-if="showCode">
                  <pre><code>{{ codeSnippet }}</code></pre>
              </div>

              <p class="category">
                <span style="float: left; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong style="text-decoration: underline; ">状态</strong></span>  <span style="float: right; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace; "><strong style="font-family: Arial, sans-serif; text-decoration: underline;">系统信息</strong></span>
                <br>
                <span style="float: left; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong>Id:</strong> {{machine.Id}}</span> <span style="float: right; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong>Os:</strong> {{ machine.Details.os }} </span>
                <br>
                <span style="float: left; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong>Status:</strong> {{machine.State}}</span> <span style="float: right; width: 50%;"><strong>Arch:</strong> {{ machine.Details.arch }} </span>          
                <br>
                <span style="float: left; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong>UserOrg:</strong> {{machine.UserOrg}}</span>           <span style="float: right; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong>Network:</strong> {{ machine.Details.network }} </span>
                <br>
                <span style="float: left; width: 50%; font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong>User:</strong> {{machine.User}}</span>          <span style="float: right; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong>Ram</strong> {{ machine.Details.ram }} </span>
                <br>
                <span style="float: left; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong>OwnerOrg:</strong> {{machine.OwnerOrg}}</span>          <span style="float: right; width: 50%;"></span> 
                <br>
                <span style="float: left; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong>UserOrgDueDate:</strong> {{machine.UserOrgDueDate}}</span>        <span style="float: right; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong style="text-decoration: underline;">连接信息</strong> </span>
                <br>
                <span style="float: left; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"></span>                                <span style="float: right; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong>IP:</strong> {{ machine.Details.ip }} </span>
                <br>
                <span style="float: left; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong style="text-decoration: underline;">CPU信息</strong></span>                                  <span style="float: right; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"></span> 
                <br>
                <span style="float: left; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong>CPUSKU:</strong> {{ machine.Details.cpusku }} </span>               <span style="float: right; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong>GPU:</strong> {{ machine.Details.gpu }} </span>
                <br>
                <span style="float: left; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong>CPU Cores:</strong> {{ machine.Details.cpucores }} </span>             <span style="float: right; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"></span> 
                <br>
                <span style="float: left; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"><strong>CPU Sockets:</strong> {{ machine.Details.cpusockets }} </span>              <span style="float: right; width: 50%;font-family: 'Monaco', 'Courier New', Courier, monospace;"></span>
                <br>
                </p>
            </md-card-header>
        </md-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" >
        <md-card>
              <md-card-header data-background-color="gray">
                <p class="category"></p>
              </md-card-header>
              <md-card-content>
                <SimpleTable_info_log :machine="machine"></SimpleTable_info_log>
              </md-card-content>
        </md-card>
      </div>

    </div>
  </div>
</template>

<script>

import SimpleTable_info_log from '../components/Tables/SimpleTable_info_log.vue';

export default {
  components: {
    SimpleTable_info_log
  },
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  methods: {
    closeOverlay() {
      this.$router.push("/table_my"); // 返回上一页面
    },
    Connection(Id) {
      this.$router.push({name: "Terminal", params: { itemId: Id }});
    },
    closeOverlayClick(event) {
      if (event.target === this.$refs.overlay) {
        this.$router.push("/table_my");
      }
    },
    Back() {
      this.$router.push("/table_my");
    },
    Delete() {
      this.$axios.get(window.location.protocol+"//"+window.location.host+"/api/v1/deleteresource/"+this.machineId)
        .then(response => {
          if (response.data.message === "error") {
            this.$toast.error(''+response.data.error);
          }
          setTimeout(() => {
            this.$router.push("/table_my");
          }, 1000);
        })
        .catch(error => {
          this.$toast.error(''+error);
        });
    },
    Code() {
      this.showCode = !this.showCode; // 切换显示状态
    }
    
  },
  created() {
    this.$axios.get('/api/v1/queryresource/'+this.machineId)
      .then(response => {
        if (response.data.message === "error") {
          this.$toast.error(''+response.data.error);
        }
        this.machine = JSON.parse(response.data.data);
        console.log(this.machine);
      })
      .catch(error => {
        this.$toast.error(''+error);
      });
  },
  data() {
    return {
      machineId: this.$route.params.itemId,
      machine: {},
      showCode: false,
      codeSnippet: "curl " +window.location.protocol +"//"+window.location.host +  "/api/v1/setup/"+ this.$route.params.itemId + " | bash",
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

</style>