// services/AirtableService.js
import axios from 'axios';

const baseURL = `https://api.airtable.com/v0/appErImxpeRDom8je`;
const config = {
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_AIRTABLE_API_KEY}`
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
  
  async getRecordById(recordId) {
    try {
      const response = await axios.get(`${baseURL}/pathways/${recordId}`, config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};