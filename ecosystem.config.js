module.exports = {
  apps: [
    {
      name: "ttc-next-app",
      script: "npm",
      args: "run production",
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
