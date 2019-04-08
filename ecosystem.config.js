module.exports = {
  apps: [
    {
      name: "github-webhooks-deploy",
      script: "./index.js",
      env: {
        NODE_ENV: "development",
        SECRET: "testtesttest"
      }
    }
  ]
};
