module.exports = {
    ci: {
      collect: {
        staticDistDir: "./.output/public",
        url: ["http://localhost:3000"], 
      },
      upload: {
        target: "temporary-public-storage",
      },
    },
  };
  