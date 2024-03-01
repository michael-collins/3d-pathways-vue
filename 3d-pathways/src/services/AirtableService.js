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
  async getExerciseById(exerciseId) {
    try {
      const response = await axios.get(`${baseURL}/exercises/${exerciseId}`, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching exercise:', error);
    }
  },
  async getCompetencyById(competencyId) {
    try {
      const response = await axios.get(`${baseURL}/competencies/${competencyId}`, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching competency:', error);
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