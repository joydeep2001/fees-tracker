const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.OAUTH2_REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
console.log(CLIENT_ID);
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

async function uploadFile(filename) {
  const filePath = path.join(__dirname, `tmp/${filename}`);
  let ssURL = "";
  try {
    const response = await drive.files.create({
      requestBody: {
        name: filename,
        mimeType: "image/png",
      },
      media: {
        mimeType: "image/png",
        body: fs.createReadStream(filePath),
      },
    });
    console.log('rid', response.data.id);
    ssURL = getPublicURL(response.data.id);
  } catch (err) {
    console.log(err);
  } finally {
    fs.rm(filePath, {}, (err) => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log("File deleted successfully");

    });
  }
  return ssURL;
}
async function getPublicURL(id) {
  try {
    await drive.permissions.create({
      fileId: id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      }
    });
    const result = await drive.files.get({
      fileId: id,
      fields: 'webViewLink, webContentLink'
    });
    console.log(result.data);
    return result.data.webContentLink;
  } catch(error) {
    console.log('err: public url ', error.message);
    return null;
  }
}

module.exports = uploadFile;
