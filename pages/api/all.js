import React from 'react';
import PropTypes from 'prop-types';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

// const docs = [import('./app-bar.md'), import('./avatar.md')];

class Page extends React.Component {
  _getMarkdownFiles() {
    const { pages } = this.context;

    const markdowns = pages
      .find(page => page.pathname === '/api')
      .children.filter(child => child.pathname !== '/api/all')
      .map((child) => child.markdown);

    console.log('markdowns', markdowns);

    return markdowns;
  }
  constructor() {
    super();
    this.state = {
      markdowns: null,
    };
  }
  componentDidMount() {
    const markdowns = this._getMarkdownFiles();
    this.setState({
      markdowns,
    });
  }
  render() {
    const { markdowns } = this.state;

    return (
      <div>
        {markdowns &&
          markdowns.map((markdown, index) => (
            <div key={index} style={{ margin: '10px auto', backgroundColor: '#fff', width: '90%', padding: '2em' }}>
              <MarkdownDocs markdown={markdown} />
            </div>
          ))}
      </div>
    );
  }
}

Page.contextTypes = {
  pages: PropTypes.array.isRequired,
};

export default withRoot(Page);
