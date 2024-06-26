import { api } from "./endpoint";

async function getCustomers() {
    try {
      const { data } = await api.get("/customers");

      return data
    } catch (error: any) {
      throw new Error(error);
    }
}

async function getServices() {
    try {
      const { data } = await api.get("/services");

      return data
    } catch (error: any) {
      throw new Error(error);
    }
  }

export default {
   getCustomers,
   getServices
}