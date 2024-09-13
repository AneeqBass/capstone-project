import { createStore } from "vuex";
import axiosInstance from "@/api/axiosInstance.js";
import router from "@/router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useCookies } from 'vue3-cookies';

export default createStore({
  state: {
    users: null,
    user: null,
    stocks: null,
    stock: null,
    orders: null,
    order: null,
    orderItems: null,
    orderItem: null
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setStocks(state, payload) {
      state.stocks = payload;
    },
    setStock(state, payload) {
      state.stock = payload;
    },
    setOrders(state, payload) {
      state.orders = payload;
    },
    setOrder(state, payload) {
      state.order = payload;
    },
    setOrderItems(state, payload) {
      state.orderItems = payload;
    },
    setOrderItem(state, payload) {
      state.orderItem = payload;
    },
    clearUser(state) {
      state.user = null;
    }
  },
  actions: {
    async login({ commit }, payload) {
      const { cookies } = useCookies();
      try {
        const { data } = await axiosInstance.post(`users/login`, payload);
        console.log(data);

        if (data) {
          commit("setUser", data.user || data);
          cookies.set("authToken", data.token || data, { expires: "7d" });
          cookies.set("user", data.user || data, { expires: "7d" });
          router.push({ name: "home" });
          toast.success("Login successful!", {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error(`${data.msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async logout({ commit }) {
      const { cookies } = useCookies();
      try {
        cookies.remove("authToken");
        commit("clearUser");
        router.push({ name: "login" });
        toast.success("Logout successful!", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } catch (e) {
        toast.error("Logout failed.", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async fetchUsers({ commit }) {
      try {
        const { data, msg } = await axiosInstance.get("users");
        if (data) {
          commit("setUsers", data.result || data);
        } else {
          toast.error(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async fetchUser({ commit }, id) {
      try {
        const { data, msg } = await axiosInstance.get(`users/${id}`);
        if (data) {
          commit("setUser", data.result || data);
        } else {
          toast.error(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async updateUser({ dispatch }, payload) {
      try {
        const { msg, err } = await axiosInstance.patch(
          `users/update/${payload.id}`,
          payload
        );
        if (msg) {
          dispatch("fetchUsers");
        } else {
          toast.error(err, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async register({ dispatch }, payload) {
      try {
        const { msg, err, token } = await axiosInstance.post(
          "users/register",
          payload
        );
        if (token) {
          dispatch("fetchUsers");
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
          router.push({ name: "login" }); // Ensure "login" is a valid route name
        } else {
          toast.error(err, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async deleteUser({ dispatch }, id) {
      try {
        const { msg, err } = await axiosInstance.delete(`users/delete/${id}`);
        if (msg) {
          dispatch("fetchUsers");
        } else {
          toast.error(err, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async fetchStocks({ commit }) {
      try {
        const { data, msg } = await axiosInstance.get("stocks");
        if (data) {
          commit("setStocks", data.results || data);
        } else {
          toast.error(msg, { autoClose: 3000 });
        }
      } catch (error) {
        toast.error(error.message, {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async fetchStockFromOrderId({ commit }, payload) {
      try {
        const { data } = await axiosInstance.post(`stocks/orderItems/${payload.orderId}`, payload.stockId);

        if (data) {
          commit("setStock", data.result || data);
        } else {
          toast.error(data.msg || 'Error fetching stocks', {
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (error) {
        toast.error(error.message, {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },

    async fetchStock({ commit }, id) {
      try {
        const { data, msg } = await axiosInstance.get(`stocks/${id}`);
        if (data) {
          commit("setStock", data.result || data);
        } else {
          toast.error(msg, {
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (error) {
        toast.error(error.message, {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async addStock({ dispatch }, payload) {
      try {
        const { msg } = await axiosInstance.post(
          "stocks/addStock",
          payload
        );
        if (msg) {
          dispatch("fetchStocks");
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async updateStock({ dispatch }, payload) {
      try {
        const { msg } = await axiosInstance.patch(
          `stocks/update/${payload.id}`,
          payload
        );
        if (msg) {
          dispatch("fetchStocks");
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async deleteStock({ dispatch }, id) {
      try {
        const { msg } = await axiosInstance.delete(`stocks/delete/${id}`);
        if (msg) {
          dispatch("fetchStocks");
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async fetchOrderItems({ commit }, id) {
      try {
        const { data, msg } = await axiosInstance.get(`orderItems/${id}`);
        if (data) {
          commit("setOrderItems", data.results || data);
        } else {
          toast.error(msg, { autoClose: 3000 });
        }
      } catch (error) {
        toast.error(error.message, {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async fetchOrderItem({ commit }, payload) {
      try {
        const { data } = await axiosInstance.post(`orderItems/stock/${payload.orderId}`, payload.stockId);

        if (data) {
          commit("setOrderItem", data.result || data);
        } else {
          toast.error(data.msg || 'Error fetching stocks', {
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (error) {
        toast.error(error.message, {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async addOrderItem({ dispatch }, payload) {
      try {
        const { msg } = await axiosInstance.post(
          "orderItems/addOrderItem",
          payload
        );
        if (msg) {
          dispatch("fetchOrderItems");
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async updateOrderItem({ dispatch }, payload) {
      try {
        const { msg } = await axiosInstance.patch(
          `orderItems/update/${payload.id}`,
          payload
        );
        if (msg) {
          dispatch("fetchOrderItems");
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async deleteOrderItem({ dispatch }, id) {
      try {
        const { msg } = await axiosInstance.delete(`orderItems/delete/${id}`);
        if (msg) {
          dispatch("fetchOrderItems");
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async fetchOrders({ commit }) {
      try {
        const { data, msg } = await axiosInstance.get("orders");
        if (data) {
          commit("setOrders", data.results || data);
        } else {
          toast.error(msg, { autoClose: 3000 });
        }
      } catch (error) {
        toast.error(error.message, {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async fetchOrder({ commit }, id) {
      try {
        const { data, msg } = await axiosInstance.get(`orders/${id}`);
        if (data) {
          commit("setOrder", data.result || data);
        } else {
          toast.error(msg, {
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (error) {
        toast.error(error.message, {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async addOrder({ dispatch }, payload) {
      try {
        const { msg } = await axiosInstance.post(
          "orders/addOrder",
          payload
        );
        if (msg) {
          dispatch("fetchOrders");
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async updateOrder({ dispatch }, payload) {
      try {
        const { msg } = await axiosInstance.patch(
          `orders/update/${payload.id}`,
          payload
        );
        if (msg) {
          dispatch("fetchOrders");
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async deleteOrder({ dispatch }, id) {
      try {
        const { msg } = await axiosInstance.delete(`orders/delete/${id}`);
        if (msg) {
          dispatch("fetchOrders");
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
  },
  modules: {},
});
