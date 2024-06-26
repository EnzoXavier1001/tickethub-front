import { ServicesType } from "../types/services";
import { api } from "./endpoint";

const setServices = async (data: ServicesType) => {
    try {
      const services = await api.post("/services", {
        user: 1,
        description: data.description,
        subject: data.subject,
        category: data.category_name,
        customer: data.customer_name,
        priorityLevel: 1,
        status: 0,
      });

      return services.data
    } catch (error) {
      console.log(error);
    }
};

export default {
    setServices
}