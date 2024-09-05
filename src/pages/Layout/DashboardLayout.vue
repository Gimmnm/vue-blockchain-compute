<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <!-- <notifications></notifications> -->

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
      :title="title"
    >
      <mobile-menu slot="content"></mobile-menu>
      <!-- <sidebar-link to="/dashboard"> -->
        <!-- <md-icon>dashboard</md-icon> -->
        <!-- <p>主页</p> -->
      <!-- </sidebar-link> -->
      <sidebar-link to="/create">
        <md-icon>unarchive</md-icon>
        <p>创建算力</p>
      </sidebar-link>
      <!-- <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>个人信息</p>
      </sidebar-link> -->
      <sidebar-link to="/table_my">
        <md-icon>bubble_chart</md-icon>
        <p>我的算力</p>
      </sidebar-link>
      <sidebar-link to="/table_all">
        <md-icon>content_paste</md-icon>
        <p>组内算力</p>
      </sidebar-link>
      <sidebar-link to="/table_tr">
        <md-icon>library_books</md-icon>
        <p>算力市场</p>
      </sidebar-link> 
      

       
      <!-- <sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Typography</p>
      </sidebar-link> -->
      <!-- <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link> -->
      <!-- <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link> -->
      <!-- <sidebar-link to="/upgrade" class="active-pro">
        <md-icon>unarchive</md-icon>
        <p>Upgrade to PRO</p>
      </sidebar-link> -->
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <!-- <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin> -->

      <dashboard-content> </dashboard-content>

      <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
// import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
// import FixedPlugin from "./Extra/FixedPlugin.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    // ContentFooter,
    MobileMenu,
    // FixedPlugin,
  },
  data() {
    return {
      sidebarBackground: "blue",
      sidebarBackgroundImage: require("@/assets/img/sidebar-6.png"),
      title: "Block Compute",
    };
  },
};
</script>
