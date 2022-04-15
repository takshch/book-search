module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
            @import "src/styles/app.scss";
            @import "src/styles/font.scss";
          `,
      },
    },
  },
};