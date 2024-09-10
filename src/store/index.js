import { createStore } from "vuex";
import axiosInstance from "@/api/axiosInstance";
import router from "@/router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default createStore({
  state: {
    users: null,
    user: null, // Current user details
    currentUser: null, // New state for current user details
    supplements: null,
    supplement: null,
    equipments: null,
    equipment: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
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
      console.log("user =" + user);
    },
    setEquipments(state, payload) {
      state.equipments = payload;
    },
    setEquipment(state, payload) {
      state.equipment = payload;
    },
    setSupplements(state, payload) {
      state.supplements = payload;
    },
    setSupplement(state, payload) {
      state.supplement = payload;
    },
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = !!token;
      localStorage.setItem("token", token);
    },
    clearAuth(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const { data, msg } = await axiosInstance.post("users/login", payload);
        if (data) {
          commit("setToken", data.token || data);
          toast.success("Login successful!", {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
          router.push({ name: "home" }); // Ensure "home" is a valid route name
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
    async logout({ commit }) {
      commit("clearAuth");
      router.push({ name: "login" }); // Ensure "login" is a valid route name
    },
    async fetchUsers({ commit }) {
      try {
        const { data, msg } = await axiosInstance.get("users");
        if (data) {
          commit("setUsers", data.result || data);
        } else {
          toast.error(msg, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
        }
      } catch (e) {
        toast.error(e.message, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
      }
    },
    async fetchUser({ commit }, id) {
      try {
        const { data, msg } = await axiosInstance.get(`users/${id}`);
        if (data) {
          commit("setUser", data.result || data);
        } else {
          toast.error(msg, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
        }
      } catch (e) {
        toast.error(e.message, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
      }
    },
    async fetchCurrentUser({ commit }) {
      console.log("fetchCurrentUser start");
      try {
        const { data, msg } = await axiosInstance.get("users/me", {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        });
        console.log(data)
        if (data) {
          commit("setCurrentUser", data.result || data);
        } else {
          toast.error(msg, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
        }
      } catch (e) {
        toast.error(e.message, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
      }
      console.log("fetchCurrentUser end");
    },
    async updateUser({ dispatch }, payload) {
      try {
        const { msg, err } = await axiosInstance.patch(`users/update/${payload.id}`, payload);
        if (msg) {
          dispatch("fetchUsers");
        } else {
          toast.error(err, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
        }
      } catch (e) {
        toast.error(e.message, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
      }
    },
    async register({ dispatch }, payload) {
      try {
        const { msg, err, token } = await axiosInstance.post("users/register", payload);
        if (token) {
          dispatch("fetchUsers");
          toast.success(msg, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
          router.push({ name: "login" }); // Ensure "login" is a valid route name
        } else {
          toast.error(err, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
        }
      } catch (e) {
        toast.error(e.message, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
      }
    },
    async deleteUser({ dispatch }, id) {
      try {
        const { msg, err } = await axiosInstance.delete(`users/delete/${id}`);
        if (msg) {
          dispatch("fetchUsers");
        } else {
          toast.error(err, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
        }
      } catch (e) {
        toast.error(e.message, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
      }
    },
    async fetchEquipments({ commit }) {
      try {
        const { data, msg } = await axiosInstance.get("equipment");
        if (data) {
          commit("setEquipments", data.results || data);
        } else {
          toast.error(msg, { autoClose: 3000 });
        }
      } catch (error) {
        toast.error(error.message, { autoClose: 3000, position: toast.POSITION.BOTTOM_CENTER });
      }
    },
    async fetchEquipment({ commit }, id) {
      try {
        const { data, msg } = await axiosInstance.get(`equipment/${id}`);
        if (data) {
          commit("setEquipment", data.result || data);
        } else {
          toast.error(msg, { autoClose: 3000, position: toast.POSITION.BOTTOM_CENTER });
        }
      } catch (error) {
        toast.error(error.message, { autoClose: 3000, position: toast.POSITION.BOTTOM_CENTER });
      }
    },
    async addEquipment({ dispatch }, payload) {
      try {
        const { msg } = await axiosInstance.post("equipment/addEquipment", payload);
        if (msg) {
          dispatch("fetchEquipments");
          toast.success(msg, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
        }
      } catch (e) {
        toast.error(e.message, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
      }
    },
    async updateEquipment({ dispatch }, payload) {
      try {
        const { msg } = await axiosInstance.patch(`equipment/update/${payload.id}`, payload);
        if (msg) {
          dispatch("fetchEquipments");
          toast.success(msg, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
        }
      } catch (e) {
        toast.error(e.message, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
      }
    },
    async deleteEquipment({ dispatch }, id) {
      try {
        const { msg } = await axiosInstance.delete(`equipment/delete/${id}`);
        if (msg) {
          dispatch("fetchEquipments");
          toast.success(msg, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
        }
      } catch (e) {
        toast.error(e.message, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
      }
    },
    async fetchSupplements({ commit }) {
      try {
        const { data, msg } = await axiosInstance.get("supplements");
        if (data) {
          commit("setSupplements", data.results || data);
        } else {
          toast.error(msg, { autoClose: 3000 });
        }
      } catch (error) {
        toast.error(error.message, { autoClose: 3000, position: toast.POSITION.BOTTOM_CENTER });
      }
    },
    async fetchSupplement({ commit }, id) {
      try {
        const { data, msg } = await axiosInstance.get(`supplements/${id}`);
        if (data) {
          commit("setSupplement", data.result || data);
        } else {
          toast.error(msg, { autoClose: 3000, position: toast.POSITION.BOTTOM_CENTER });
        }
      } catch (error) {
        toast.error(error.message, { autoClose: 3000, position: toast.POSITION.BOTTOM_CENTER });
      }
    },
    async addSupplement({ dispatch }, payload) {
      try {
        const { msg } = await axiosInstance.post("supplements/addSupplement", payload);
        if (msg) {
          dispatch("fetchSupplements");
          toast.success(msg, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
        }
      } catch (e) {
        toast.error(e.message, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
      }
    },
    async updateSupplement({ dispatch }, payload) {
      try {
        const { msg } = await axiosInstance.patch(`supplements/update/${payload.id}`, payload);
        if (msg) {
          dispatch("fetchSupplements");
          toast.success(msg, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
        }
      } catch (e) {
        toast.error(e.message, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
      }
    },
    async deleteSupplement({ dispatch }, id) {
      try {
        const { msg } = await axiosInstance.delete(`supplements/delete/${id}`);
        if (msg) {
          dispatch("fetchSupplements");
          toast.success(msg, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
        }
      } catch (e) {
        toast.error(e.message, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
      }
    },
  },
  modules: {},
});
