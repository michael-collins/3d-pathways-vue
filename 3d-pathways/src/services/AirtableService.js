// services/AirtableService.js
import axios from 'axios';

const baseURL = `https://api.airtable.com/v0/appErImxpeRDom8je`;
const config = {
  headers: {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`
  }
};

export default {
  async getRecords() {
    try {
      const response = await axios.get(`${baseURL}/pathways`, config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  // async getLinkedRecords(recordId) {
  //   // Implement fetching linked records based on recordId
  // }
};
