// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Carousel Docs',
  url: 'https://example.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'carousel',
  projectName: 'carousel',
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */ ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
      }),
    ],
  ],
};

module.exports = config;
