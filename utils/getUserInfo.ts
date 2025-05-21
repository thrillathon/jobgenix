import { google } from "googleapis";

export const getUserAdditionalInfo = async (accessToken: string) => {
  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: accessToken,
    });

    const service = google.people({ version: "v1", auth: oauth2Client });
    const res = await service.people.get({
      resourceName: "people/me",
      personFields: "genders,phoneNumbers",
    });

    const data = res.data;
    return {
      gender: data.genders?.[0]?.value,
      phoneNumber: data.phoneNumbers?.[0]?.value,
    };
  } catch (error) {
    console.error("Error fetching additional user info:", error);
    throw error;
  }
};
