import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/views/layout/Layout";
export const constantRouterMap = [
    // {
    //     path: '',
    //     // component: () => import('@/views/login'),
    //     redirect: 'login',
    // },
    {
        path: "/login",
        component: () => import("@/views/login"),
        name: "login"
    },
    {
        path: "",
        component: Layout,
        redirect: "home",
        children: [
            {
                path: "/home",
                component: () => import("@/views/home"),
                name: "home",
                meta: { title: "欢迎", icon: "dashboard", noCache: true }
            },
            {
                path: "/fabricList",
                component: () => import("@/views/fabricList"),
                name: "fabricList"
            },
            {
                path: "/itemCategoryManage",
                component: () => import("@/views/itemCategoryManage"),
                name: "itemCategoryManage"
            },
            {
                path: "/fabricOptionsManage",
                component: () => import("@/views/fabricOptionsManage"),
                name: "fabricOptionsManage"
            },
            {
                path: "/fabricOptionsSetting",
                component: () => import("@/views/fabricOptionsSetting"),
                name: "fabricOptionsSetting"
            },
            {
                path: "/imgSpace",
                component: () => import("@/views/imgSpace"),
                name: "imgSpace"
            },
            {
                path: "/addFabric",
                component: () => import("@/views/addFabric"),
                name: "addFabric"
            },
            {
                path: "/editFabric",
                component: () => import("@/views/editFabric"),
                name: "editFabric"
            },
            {
                path: "/personality",
                component: () => import("@/views/personality"),
                name: "personality"
            },
            {
                path: "/personalityList",
                component: () => import("@/views/personalityList"),
                name: "personalityList"
            },
            {
                path: "/editPersonality",
                component: () => import("@/views/editPersonality"),
                name: "editPersonality"
            },
            {
                path: "/addGoods",
                component: () => import("@/views/addGoods"),
                name: "addGoods"
            },
            {
                path: "/editGoods",
                component: () => import("@/views/editGoods"),
                name: "editGoods"
            },
            {
                path: "/goodsList",
                component: () => import("@/views/goodsList"),
                name: "goodsList"
            },
            {
                path: "/order",
                component: () => import("@/views/order"),
                name: "order"
            },
            {
                path: "/orderInfo",
                component: () => import("@/views/orderInfo"),
                name: "orderInfo"
            },
            {
                path: "/bannerSetting",
                component: () => import("@/views/bannerSetting"),
                name: "bannerSetting"
            },
            {
                path: "/logisticsCompanyManage",
                component: () => import("@/views/logisticsCompanyManage"),
                name: "logisticsCompanyManage"
            },
            {
                path: "/accountRecord",
                component: () => import("@/views/accountRecord"),
                name: "accountRecord"
            },
            {
                path: "/permissionManage",
                component: () => import("@/views/permissionManage"),
                name: "permissionManage"
            },
            {
                path: "/gruopManage",
                component: () => import("@/views/gruopManage"),
                name: "gruopManage"
            },
            {
                path: "/accountManage",
                component: () => import("@/views/accountManage"),
                name: "accountManage"
            },
            {
                path: "/customerManage",
                component: () => import("@/views/customerManage"),
                name: "customerManage"
            },
            {
                path: "/fabricInfo",
                component: () => import("@/views/fabricInfo"),
                name: "fabricInfo"
            },
            {
                path: "/personalityInfo",
                component: () => import("@/views/personalityInfo"),
                name: "personalityInfo"
            },
            {
                path: "/evaluateManage",
                component: () => import("@/views/evaluateManage"),
                name: "evaluateManage"
            },
            {
                path: "/feedback",
                component: () => import("@/views/feedback"),
                name: "feedback"
            },
            {
                path: "/saleDetail",
                component: () => import("@/views/saleDetail"),
                name: "saleDetail"
            },
            {
                path: "/messageCenter",
                component: () => import("@/views/messageCenter"),
                name: "messageCenter"
            },
            {
                path: "/freightManage",
                component: () => import("@/views/freightManage"),
                name: "freightManage"
            },
            {
                path: "/addFreight",
                component: () => import("@/views/addFreight"),
                name: "addFreight"
            },
            {
                path: "/editFreight",
                component: () => import("@/views/editFreight"),
                name: "editFreight"
            },
            {
                path: "/sizeFiledManage",
                component: () => import("@/views/sizeFiledManage"),
                name: "sizeFiledManage"
            },
            {
                path: "/sizeTemplateManage",
                component: () => import("@/views/sizeTemplateManage"),
                name: "sizeTemplateManage"
            },
            {
                path: "/addSizeTemplate",
                component: () => import("@/views/addSizeTemplate"),
                name: "addSizeTemplate"
            },
            {
                path: "/editSizeTemplate",
                component: () => import("@/views/editSizeTemplate"),
                name: "editSizeTemplate"
            },
            {
                path: "/fontlibManage",
                component: () => import("@/views/fontlibManage"),
                name: "fontlibManage"
            },
            {
                path: "/contractReview",
                component: () => import("@/views/contractReview"),
                name: "contractReview"
            },
            {
                path: "/auditInvoice",
                component: () => import("@/views/auditInvoice"),
                name: "auditInvoice"
            },
            {
                path: "/withdrawalAudit",
                component: () => import("@/views/withdrawalAudit"),
                name: "withdrawalAudit"
            },
            {
                path: "/contractDetail",
                component: () => import("@/views/contractDetail"),
                name: "contractDetail"
            },
            {
                path: "/schoolManage",
                component: () => import("@/views/schoolManage"),
                name: "schoolManage"
            },
            {
                path: "/classManage",
                component: () => import("@/views/classManage"),
                name: "classManage"
            },
            {
                path: "/parentAccountManage",
                component: () => import("@/views/parentAccountManage"),
                name: "parentAccountManage"
            },
            {
                path: "/studentManage",
                component: () => import("@/views/studentManage"),
                name: "studentManage"
            },
            {
                path: "/schoolAccountManage",
                component: () => import("@/views/schoolAccountManage"),
                name: "schoolAccountManage"
            },
            {
                path: "/cityPartnerManage",
                component: () => import("@/views/cityPartnerManage"),
                name: "cityPartnerManage"
            },
            {
                path: "/styleManage",
                component: () => import("@/views/styleManage"),
                name: "styleManage"
            },
            {
                path: "/specialShapeManage",
                component: () => import("@/views/specialShapeManage"),
                name: "specialShapeManage"
            },
            {
                path: "/productTypeManage",
                component: () => import("@/views/productTypeManage"),
                name: "productTypeManage"
            },
        ]
    }
];

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
