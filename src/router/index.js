import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      name: "nNotFound",
      redirect: "/",
    },
    {
      path: "/",
      name: "Layout",
      component: () => import("views/layout/Layout.vue"),
      redirect: "/home",
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("views/FrontEnd/Home.vue"),
        },
        {
          path: "/about",
          name: "About",
          component: () => import("views/FrontEnd/About.vue"),
        },
        {
          path: "products/",
          name: "Products",
          component: () => import("views/layout/ProductsLayout.vue"),
          redirect: "/products/productList/",
          children: [
            {
              path: "productList/:category",
              name: "ProductList",
              component: () => import("views/FrontEnd/ProductList.vue"),
            },
            {
              path: "item/:productId",
              name: "ProductInfo",
              component: () => import("views/FrontEnd/ProductInfo.vue"),
            },
          ],
        },
        {
          path: "/favorite",
          name: "Favorite",
          component: () => import("views/FrontEnd/Favorite.vue"),
        },
        {
          path: "/event",
          name: "Event",
          component: () => import("views/FrontEnd/Event.vue"),
        },
        {
          path: "order/",
          name: "Order",
          component: () => import("views/layout/Order.vue"),
          redirect: "/order/cartlist",
          children: [
            {
              path: "cartlist",
              name: "CartList",
              component: () => import("views/FrontEnd/CartList.vue"),
            },
            {
              path: "customerinfo",
              name: "CustomerInfo",
              component: () => import("views/FrontEnd/CustomerInfo.vue"),
            },
            {
              path: "checkout/:orderId",
              name: "OrderCheck",
              component: () => import("views/FrontEnd/OrderCheck.vue"),
            },
            {
              path: "ordercompleted",
              name: "OrderCompleted",
              component: () => import("views/FrontEnd/OrderCompleted.vue"),
            },
          ],
        },
        {
          path: "customer/",
          name: "Customer",
          component: () => import("views/layout/Customer.vue"),
          redirect: "/customer/myorderlist",
          meta: {
            requiresAuth: true,
          },
          children: [
            {
              path: "myorderlist",
              name: "MyOrderList",
              meta: {
                requiresAuth: true,
              },
              component: () => import("views/FrontEnd/MyOrderList.vue"),
            },
            {
              path: "mycouponlist",
              name: "MyCouponList",
              meta: {
                requiresAuth: true,
              },
              component: () => import("views/FrontEnd/MyCouponList.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("views/FrontEnd/Login.vue"),
    },
    {
      path: "/admin",
      name: "DashboardLayout",
      redirect: "/admin/catalogue",
      component: () => import("views/layout/Dashboard.vue"),
      children: [
        {
          path: "catalogue",
          name: "Catalogue",
          component: () => import("views/admin/AdminCatalogue.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "orderlist",
          name: "OrderList",
          component: () => import("views/admin/AdminOrderList.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "couponlist",
          name: "CouponList",
          component: () => import("views/admin/AdminCouponList.vue"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
});
