<template>
  <div
    class="sidebar"
    :data-color="sidebarItemColor"
    :data-image="sidebarBackgroundImage"
    :style="sidebarStyle"
  >
    <div class="logo">
      <a href="#" class="simple-text logo-mini">
        <div class="logo-img">
          <img :src="imgLogo" alt="" />
        </div>
      </a>

      <a
        href="https://hyperledger-fabric.readthedocs.io/en/latest/index.html"
        target="_blank"
        class="simple-text logo-normal"
      >
        {{ title }}
      </a>
    </div>
    <br>
    <div class="info" style="color: white;">
      <strong>Organization </strong>: {{ user.org }}<br>
      
    </div>

    <div class="sidebar-wrapper">
      <slot name="content"></slot>
      <md-list class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :to="link.path"
            :link="link"
          >
          </sidebar-link>
        </slot>
      </md-list>
     
    </div>
    <div class="infot">
         <strong>User </strong>: {{user.user}}<br>
      </div>
  </div>
</template>
<script>
import SidebarLink from "./SidebarLink.vue";

export default {
  components: {
    SidebarLink,
  },
  props: {
    title: {
      type: String,
      default: "Block Compute",
    },
    sidebarBackgroundImage: {
      type: String,
      default: require("@/assets/img/sidebar-6.png"),
    },
    imgLogo: {
      type: String,
      default: require("@/assets/img/tmplogo.png"),
    },
    sidebarItemColor: {
      type: String,
      default: "blue",
      validator: (value) => {
        let acceptedValues = ["", "purple", "blue", "green", "orange", "red"];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.sidebarBackgroundImage})`,
      };
    },
  },
  data() {
    return {
      user: {},
    };
  },
  created() {
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
};
</script>
<style>
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }
}
.info {
  color: rgba(255, 255, 255, 1) !important; 
  padding: 10px; /* 添加一些内边距 */
  text-align: center;
}
.infot {
  position: absolute;
  word-wrap: break-word; /* 确保单词在必要时可以断开换行 */
  overflow-wrap: break-word; /* 标准属性 */
  width: 100%;
  bottom: 10px;
  color: white; /* 设置字体颜色为白色 */
  padding: 10px; /* 添加一些内边距 */
  text-align: center;
}
</style>
