module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [{ pattern: 'src/**.test.js' }],
    reporters: ['dots', 'kjhtml'],
    browsers: ['Chrome'],
    client: { clearContext: false },
    exclude: ['node_modules'],
    port: 9000,
    singleRun: false
  });
};
