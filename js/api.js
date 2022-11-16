/* eslint-disable no-unused-vars */
const pds_server = "http://localhost:8089";

// eslint-disable-next-line no-redeclare
const pdsApi = class {
  // axios get hello
  static async getHello() {
    try {
      const response = await axios.get(`${pds_server}/`);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("done!");
    }
  }

  // axios create diagnostic
  static async createDiagnostic(
    basicInfoData=null,
    painAssessmentInfoData=null,
    diagnosticData=null) {
    if (basicInfoData === null) {
      return;
    }
    const patientId = await this.postPatientBasicInfo(basicInfoData);
    if (patientId === null) {
      return;
    }
    console.log(patientId);
    const diagnosticPostData = {
      patient_basic_info_id: patientId
    };
    const diagnosticUUID = await this.postDiagnostic(diagnosticPostData);
    if (diagnosticUUID === null) {
      return;
    }
    console.log(diagnosticUUID);
    if (painAssessmentInfoData === null) {
      return;
    }
    painAssessmentInfoData.diagnostic_uuid = diagnosticUUID;
    const painAssessmentId = await this.postPainAssessmentInfo(painAssessmentInfoData);
    if (painAssessmentId === null) {
      return;
    }
    console.log(painAssessmentId);
    if (diagnosticData === null) {
      return;
    }
    const updateDiagnosticUUID = await this.updateDiagnosticByUUID(diagnosticUUID, diagnosticData);
  }

  // axios post diagnostics
  static async postDiagnostic(data) {
    try {
      const response = await axios.post(`${pds_server}/diagnostics`, data);
      if (response.status === 201) {
        return response.data.uuid;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  // axios update diagnostic by uuid
  static async updateDiagnosticByUUID(uuid, data) {
    try {
      const response = await axios.put(`${pds_server}/diagnostics/uuid/${uuid}`, data);
      if (response.status === 200) {
        return response.data.uuid;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  // axios post basic info
  static async postPatientBasicInfo(data) {
    try {
      const response = await axios.post(`${pds_server}/patients`, data);
      if (response.status === 201) {
        return response.data.id;
      }
    } catch (error) {
      console.error(error);
      console.log(error.response.data.message);
    }
    return null;
  }

  // axios post pain assessment info
  static async postPainAssessmentInfo(data) {
    try {
      const response = await axios.post(`${pds_server}/pain_assessments`, data);
      if (response.status === 201) {
        return response.data.id;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }
};
