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
      .children.filter(child => child.pathname !== '/api/all');

    console.log('markdowns', markdowns);

    return markdowns;
  }
  _getLink(path) {
    return path.replace(/(\/api\/)|(-)/ig, '');
  }
  _getName(path) {
    return path.replace(/\/api\//, '');
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
          <div>
            <ul style={{
              position: 'fixed',
              right: '0',
              top: '64px',
              backgroundColor: '#333',
              margin: '0',
              listStyle: 'none',
              padding: '2em 1em 6em',
              overflow: 'auto',
              height: '100%'
            }}>
              {
                markdowns.map((markdown, index) => (
                  <li key={`toc-${index}`} style={{ marginBottom: '4px' }}>
                    <a style={{
                      color: '#fff',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      fontFamily: 'sans-serif'
                    }} href={`#${this._getLink(markdown.pathname)}`}>{this._getName(markdown.pathname)}</a>
                  </li>
                ))
              }
            </ul>
            {
              markdowns.map((markdown, index) => (
                <div key={`section-${index}`} style={{ margin: '10px auto', backgroundColor: '#fff', width: '90%', padding: '2em' }}>
                  <MarkdownDocs markdown={markdown.markdown} />
                </div>
              ))
            }
          </div>
        }
      </div>
    );
  }
}

Page.contextTypes = {
  pages: PropTypes.array.isRequired,
};

export default withRoot(Page);
