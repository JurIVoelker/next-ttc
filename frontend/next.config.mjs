/** @type {import('next').NextConfig} */
let protocol = "http";
let hostname = "http";
let port = "1337";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL_PUBLIC;
if (strapiUrl) {
  const urlArray = strapiUrl.split("://");
  protocol = urlArray[0];
  const tmp = urlArray[1].split(":");
  hostname = tmp[0];
  if (tmp.length) {
    port = tmp[1];
  } else {
    port = 80;
  }
}

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: protocol,
        hostname: hostname,
        port: port,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
