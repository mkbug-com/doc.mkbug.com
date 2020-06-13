/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  title: 'Mkbug.js', // Title for your website.
  tagline: 'A OOP style nodejs web framework base on express.js!',
  desc: '一个基于Express.js封装的OOP风格的Restful api框架。',
  url: 'https://doc.mkbug.com', // Your website URL
  baseUrl: '/', // Base URL for your project */

  headerLinks: [
    {doc: 'quick-start', label: 'Docs'},
    {doc: 'doc4', label: 'API'},
    {blog: true, label: 'Change Log'}
  ],

  /* path to images for header/footer */
  headerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#6e6e6e',
    secondaryColor: '#e6e6e6',
  },

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true
};

module.exports = siteConfig;
