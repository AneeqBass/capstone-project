import { createStore } from "vuex";
import axios from "axios";
import router from "@/router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const apiURL = "https://fitquip-capstone.onrender.com/";

export default createStore({
  state: {
    users: null,
    user: null,
    supplements: null,
    supplement: null,
    equipments: null,
    equipment: null,
  },
  getters: {},
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    setUser(state, payload) {
      state.user = payload;
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
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        let { data, msg } = await axios.get(`${apiURL}users`);
        if (data) {
          commit("setUsers", data.result || data);
          console.log(data);
        } else {
          toast.error(`${msg}`, {
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
    async fetchUser({ commit }, id) {
      try {
        const { data, msg } = await axios.get(`${apiURL}users/${id}`);
        if (data) {
          commit("setUser", data.result || data);
        } else {
          toast.error(`${msg}`, {
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
    async updateUser(context, payload) {
      console.log(payload);

      try {
        const { msg, err } = await (
          await axios.patch(`${apiURL}users/update/${payload.id}`, payload)
        ).data;
        if (msg) {
          context.dispatch("fetchUsers");
        } else {
          toast.error(`${err}`, {
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
    async register(context, payload) {
      try {
        const { msg, err, token } = await (
          await axios.post(`${apiURL}users/register`, payload)
        ).data;
        if (token) {
          context.dispatch("fetchUsers");
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
          router.push({ name: "login" });
        } else {
          toast.error(`${err}`, {
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
    async deleteUser(context, id) {
      try {
        const { msg, err } = await (
          await axios.delete(`${apiURL}users/delete/${id}`)
        ).data;
        if (msg) {
          context.dispatch("fetchUsers");
        } else {
          toast.error(`${err}`, {
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
    async fetchEquipments({ commit }) {
      try {
        let { data, msg } =  await axios.get(`${apiURL}equipment`) 
        console.log(data)
            
            if (data) {
              commit("setEquipments", data.results || data);
              console.log(data);
              
            } else {
              toast.error(`${msg}`, {
                autoClose: 3000
              });
            }
          } catch (error) {
            toast.error(`${error.message}`, {
              autoClose: 3000,
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
    },
    async fetchEquipment({ commit }, id) {
      try {
        let { data, msg } = await axios.get(`${apiURL}equipment/${id}`)
            if (data) {
              commit("setEquipment", data.result || data);
            console.log(data);
            }
            else {
              toast.error(`${msg}`, {
                autoClose: 3000,
                position: toast.POSITION.BOTTOM_CENTER,
              });
            }
          } catch (error) {
            toast.error(`${error.message}`, {
              autoClose: 3000,
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
    },
    async addEquipment(context, payload) {
      try {
        const { msg } = await (
          await axios.post(`${apiURL}equipment/addEquipment`, payload)
        ).data;
        if (msg) {
          context.dispatch("fetchEquipments");
          toast.success(`${msg}`, {
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
    async updateEquipment(context, payload) {
      console.log(payload);

      try {
        const { msg } = await (
          await axios.patch(`${apiURL}equipment/update/${payload.id}`, payload)
        ).data;
        if (msg) {
          context.dispatch("fetchEquipments");
          toast.success(`${msg}`, {
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
    async deleteEquipment(context, id) {
      try {
        const { msg } = await (
          await axios.delete(`${apiURL}equipment/delete/${id}`)
        ).data;
        if (msg) {
          context.dispatch("fetchEquipments");
          toast.success(`${msg}`, {
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
    async fetchSupplements({ commit }) {
      try {
        let { data, msg } =  await axios.get(`${apiURL}supplements`) 
            
            if (data) {
              commit("setSupplements", data.results || data);
            } else {
              toast.error(`${msg}`, {
                autoClose: 3000,
              });
            }
          } catch (error) {
            toast.error(`${error.message}`, {
              autoClose: 3000,
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
    },
    async fetchSupplement({ commit }, id) {
      try {
        let { data, msg } = await axios.get(`${apiURL}supplements/${id}`);
        if (data) {
          commit("setSupplement", data.result || data);
          console.log(data);
        } else {
          toast.error(`${msg}`, {
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (error) {
        toast.error(`${error.message}`, {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async addSupplement(context, payload) {
      try {
        const { msg } = await (
          await axios.post(`${apiURL}supplements/addSupplement`, payload)
        ).data;
        if (msg) {
          context.dispatch("fetchSupplements");
          toast.success(`${msg}`, {
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
    async updateSupplement(context, payload) {
      console.log(payload);

      try {
        const { msg } = await (
          await axios.patch(
            `${apiURL}supplements/update/${payload.id}`,
            payload
          )
        ).data;
        if (msg) {
          context.dispatch("fetchSupplements");
          toast.success(`${msg}`, {
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
    async deleteSupplement(context, id) {
      try {
        const { msg } = await (
          await axios.delete(`${apiURL}supplements/delete/${id}`)
        ).data;
        if (msg) {
          context.dispatch("fetchSupplements");
          toast.success(`${msg}`, {
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
  },
  modules: {},
});
