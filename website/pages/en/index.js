/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Index extends React.Component {
  render() {
    const { config, language = '' } = this.props;
    const { baseUrl, docsUrl } = config;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    return <main className="homepage_warp">
      <div className="homepage_title">
        {config.title}
      </div>
      <img className="homepage_logo" src='/img/favicon.ico'></img>
      <div className="homepage_desc">
        {config.tagline}
      </div>
      <a className="homepage_quickstart" href={docUrl('quick-start.html')}>
        Quick Start
      </a>
    </main>;
  }
}

module.exports = Index;
