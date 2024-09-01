require("dotenv").config();
const url = process.env.FRONTEND_DEPLOYMENT_WEBHOOK_URL;
const token = process.env.FRONTEND_DEPLOYMENT_WEBHOOK_TOKEN;

if (!token || !url) {
  console.error("token or url is undefined");
  process.exit(1);
}

const options = {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
