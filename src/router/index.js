import Vue from "vue";
import Router from "vue-router";

//pages
//前台
import Home from "views/FrontEnd/Home.vue";
import About from "views/FrontEnd/About.vue";
import Login from "views/FrontEnd/Login.vue";
import ProductInfo from "views/FrontEnd/ProductInfo.vue";
import CartList from "views/FrontEnd/CartList.vue";
import CustomerInfo from "views/FrontEnd/CustomerInfo.vue";
import OrderCheck from "views/FrontEnd/OrderCheck.vue";
import OrderCompleted from "views/FrontEnd/OrderCompleted.vue";
import MyOrderList from "views/FrontEnd/MyOrderList.vue";
import MyCouponList from "views/FrontEnd/MyCouponList.vue";
import ProductList from "views/FrontEnd/ProductList.vue";
import Event from "views/FrontEnd/Event.vue";
import Favorite from "views/FrontEnd/Favorite.vue";
//後台

import Catalogue from "views/admin/AdminCatalogue.vue";
import OrderList from "views/admin/AdminOrderList.vue";
import CouponList from "views/admin/AdminCouponList.vue";

//layout
import Layout from "views/layout/Layout.vue";
import DashboardLayout from "views/layout/Dashboard.vue";
import Products from "views/layout/ProductsLayout.vue";
import Order from "views/layout/Order.vue";
import Customer from "views/layout/Customer.vue";
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
      component: Layout,
      redirect: "/home",
      children: [
        {
          path: "",
          name: "Home",
          component: Home,
        },
        {
          path: "/about",
          name: "About",
          component: About,
        },
        {
          path: "products/",
          name: "Products",
          component: Products,
          redirect: "/products/productList/",
          children: [
            {
              path: "productList/",
              name: "ProductList",
              component: ProductList,
              children: [
                {
                  path: ":category",
                  name: "ProductList/:category",
                  component: ProductList,
                },
              ],
            },
            {
              path: "item/:productId",
              name: "ProductInfo",
              component: ProductInfo,
            },
          ],
        },
        {
          path: "/favorite",
          name: "Favorite",
          component: Favorite,
        },
        {
          path: "/event",
          name: "Event",
          component: Event,
        },
        {
          path: "order/",
          name: "Order",
          component: Order,
          redirect: "/order/cartlist",
          children: [
            {
              path: "cartlist",
              name: "CartList",
              component: CartList,
              meta: {
                requiresAuth: true,
              },
            },
            {
              path: "customerinfo",
              name: "CustomerInfo",
              component: CustomerInfo,
              meta: {
                requiresAuth: true,
              },
            },
            {
              path: "checkout/:orderId",
              name: "OrderCheck",
              component: OrderCheck,
              meta: {
                requiresAuth: true,
              },
            },
            {
              path: "ordercompleted",
              name: "OrderCompleted",
              component: OrderCompleted,
              meta: {
                requiresAuth: true,
              },
            },
          ],
        },
        {
          path: "customer/",
          name: "Customer",
          component: Customer,
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
              component: MyOrderList,
            },
            {
              path: "mycouponlist",
              name: "MyCouponList",
              meta: {
                requiresAuth: true,
              },
              component: MyCouponList,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/admin",
      name: "DashboardLayout",
      redirect: "/admin/catalogue",
      component: DashboardLayout,
      children: [
        {
          path: "catalogue",
          name: "Catalogue",
          component: Catalogue,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "orderlist",
          name: "OrderList",
          component: OrderList,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "couponlist",
          name: "CouponList",
          component: CouponList,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
});
