import { createStore } from "vuex";
import axiosInstance from "@/api/axiosInstance.js";
import router from "@/router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useCookies } from 'vue3-cookies';

export default createStore({
  state: {
    users: null,
    user: null, // Current user details
    supplements: null,
    supplement: null,
    equipments: null,
    equipment: null,
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
          cookies.set("user", data.user || data);
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
    async fetchEquipments({ commit }) {
      try {
        const { data, msg } = await axiosInstance.get("equipment");
        if (data) {
          commit("setEquipments", data.results || data);
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
    async fetchEquipment({ commit }, id) {
      try {
        const { data, msg } = await axiosInstance.get(`equipment/${id}`);
        if (data) {
          commit("setEquipment", data.result || data);
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
    async addEquipment({ dispatch }, payload) {
      try {
        const { msg } = await axiosInstance.post(
          "equipment/addEquipment",
          payload
        );
        if (msg) {
          dispatch("fetchEquipments");
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
    async updateEquipment({ dispatch }, payload) {
      try {
        const { msg } = await axiosInstance.patch(
          `equipment/update/${payload.id}`,
          payload
        );
        if (msg) {
          dispatch("fetchEquipments");
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
    async deleteEquipment({ dispatch }, id) {
      try {
        const { msg } = await axiosInstance.delete(`equipment/delete/${id}`);
        if (msg) {
          dispatch("fetchEquipments");
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
    async fetchSupplements({ commit }) {
      try {
        const { data, msg } = await axiosInstance.get("supplements");
        if (data) {
          commit("setSupplements", data.results || data);
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
    async fetchSupplement({ commit }, id) {
      try {
        const { data, msg } = await axiosInstance.get(`supplements/${id}`);
        if (data) {
          commit("setSupplement", data.result || data);
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
    async addSupplement({ dispatch }, payload) {
      try {
        const { msg } = await axiosInstance.post(
          "supplements/addSupplement",
          payload
        );
        if (msg) {
          dispatch("fetchSupplements");
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
    async updateSupplement({ dispatch }, payload) {
      try {
        const { msg } = await axiosInstance.patch(
          `supplements/update/${payload.id}`,
          payload
        );
        if (msg) {
          dispatch("fetchSupplements");
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
    async deleteSupplement({ dispatch }, id) {
      try {
        const { msg } = await axiosInstance.delete(`supplements/delete/${id}`);
        if (msg) {
          dispatch("fetchSupplements");
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
