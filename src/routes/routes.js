import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList_all from "@/pages/TableList_all.vue";
import TableList_my from "@/pages/TableList_my.vue";
import TableList_tr from "@/pages/TableList_tr.vue";
import Typography_jy from "@/pages/Typography_jy.vue";
import Typography_info from "@/pages/Typography_info.vue";
import Typography_jy_info from "@/pages/Typography_jy_info.vue";
import Terminal from "@/pages/Terminal.vue";
import CreateMachine from "@/pages/CreateMachine.vue";
import CreateMachine_temp from "@/pages/CreateMachine_temp.vue";
import CreateMachine_bl from "@/pages/CreateMachine_bl.vue";
import CreateMachine_temp_id from "../pages/CreateMachine_temp_id.vue";
import Typography_cj from "@/pages/Typography_cj.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/table_my",
    children: [
      // {
      //   path: "dashboard",
      //   name: "主页",
      //   component: Dashboard,
      // },
      {
        path: "user",
        name: "用户信息",
        component: UserProfile,
      },
      {
        path: "table_all",
        name: "组内算力",
        component: TableList_all,
        meta: { title: '组内算力' } 
      },
      {
        path: "table_tr",
        name: "算力市场",
        component: TableList_tr,
        meta: { title: '算力市场' } 
      },
      {
        path: "table_my",
        name: "我的算力",
        component: TableList_my,
        meta: { title: '我的算力' } 
      },
      {
        path: "typography/info/:itemId",
        name: "Typography_info",
        component: Typography_info,
        meta: { title: '机器详细信息' } 
      },
      // {
      //   path: "typography/jx/:itemId",
      //   name: "Typography_jx",
      //   component: Typography_jx,
      //   meta: { title: '解析' } 
      // },
      {
        path: "typography/trinfo/:itemId",
        name: "Typography_jy_info",
        component: Typography_jy_info,
        meta: { title: '交易详细信息' } 
      },
      {
        path: "typography/jy/:itemId",
        name: "Typography_jy",
        component: Typography_jy,
        meta: { title: '交易' } 
      },
      {
        path: "typography/cj/:itemId",
        name: "Typography_cj",
        component: Typography_cj,
        meta: { title: '出价'}
      },
      // {
      //   path: "typography/xf/:itemId",
      //   name: "Typography_xf",
      //   component: Typography_xf,
      //   meta: { title: '续费' } 
      // },
      {
        path: "terminal/:itemId",
        name: "Terminal",
        component: Terminal,
        meta: { title: '连接服务器' }
      },
      {
        path: "create",
        name: "CreateMachine",
        component: CreateMachine,
        meta: { title: '创建算力资源'}
      },
      {
        path: "create/template",
        name: "CreateMachineTemplate",
        component: CreateMachine_temp,
        meta: { title: 'Create from automation'}
      },
      {
        path: "create/template/id/:Name",
        name: "CreateMachineTemplateWithId",
        component: CreateMachine_temp_id,
        meta: { title: 'Create from automation'} 
      },
      {
        path: "create/blank",
        name: "CreateMachineBlank",
        component: CreateMachine_bl,
        meta: { title: 'Create from blank'}
      },
      // {
      //   path: "icons",
      //   name: "Icons",
      //   component: Icons,
      // },
      // {
      //   path: "maps",
      //   name: "Maps",
      //   meta: {
      //     hideFooter: true,
      //   },
      //   component: Maps,
      // },
      // {
      //   path: "notifications",
      //   name: "Notifications",
      //   component: Notifications,
      // },
      // {
      //   path: "upgrade",
      //   name: "Upgrade to PRO",
      //   component: UpgradeToPRO,
      // },
    ],
  },
];

export default routes;
