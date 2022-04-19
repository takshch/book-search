module.exports = {
  apps: [
    {
      name: "backend",
      script: "./src/index.js",
      args: "start",
      env: {
        NODE_ENV: "production"
      },
    },
  ],
};