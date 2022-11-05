const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
//require("dotenv").config();

const GOOGLE_API_FOLDER_ID = process.env.G_DRIVE_FOLDER_ID;

const cred = {
  type: "service_account",
  project_id: process.env.GCP_PROJECT_ID,
  private_key_id: process.env.GCP_PR_KEY_ID,
  private_key: process.env.GCP_PR_KEY,
  client_email: process.env.GCP_CLIENT_EMAIL,
  client_id: process.env.GCP_CLIENT_ID,
  auth_uri: process.env.GCP_AUTH_URI,
  token_uri: process.env.GCP_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GCP_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.GCP_CLIENT_CERT_URL,
};
//console.log(cred);

async function uploadFile(filename) {
  const filePath = path.join(__dirname, `tmp/${filename}`);
  let ssURL = null;
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: cred,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    const driveService = google.drive({
      version: "v3",
      auth,
    });
    const fileMetaData = {
      name: filename,
      parents: [GOOGLE_API_FOLDER_ID],
    };

    const media = {
      mimeType: "image/png",
      body: fs.createReadStream(filePath),
    };

    const response = await driveService.files.create({
      media: media,
      resource: fileMetaData,
      fields: "webViewLink, webContentLink",
    });
    ssURL = response.data.webContentLink;
    console.log("Upload success!");
    console.log(response.data.webContentLink);
  } catch (e) {
    console.log(e);
    throw new Error("Failed to upload in gdrive");
  } finally {
    fs.rm(filePath, {}, (err) => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log("File deleted successfully");
    });
    return ssURL;
  }
}

module.exports = uploadFile;
