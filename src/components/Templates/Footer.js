import React from 'react';
import '../../styles/Footer.css';


class Footer extends React.Component {

  displayGovtFooter(){
    /* Possible site configuration setting to be set up if site is hosted on govt.nz domain */
    return false;
  }

  render(){
    return (
      <div className="footer" aria-label="Footer" role="contentinfo">
        <div className="container">
          <div className="footer-item">
            <p>Data sourced from <a href="https://data.govt.nz">data.govt.nz</a></p>
            <p>Another alpha from the <a href="https://webtoolkit.govt.nz/blog/tag/service-innovation-lab/">Service Innovation Lab</a></p>
            <p>Please find the full directory or add your services at <a href="//familyservices.govt.nz/directory">familyservices.govt.nz/directory</a></p>
          </div>
          {this.displayGovtFooter() &&
            <div className="footer-push">
              <div className="footer-icons">
                <a href="https://www.govt.nz" className="ga-track-logo-footer-aog footer-hm-link">
                  <img src="footer-logo-govt.png" srcSet="footer-logo-govt@2x.png 2x,footer-logo-govt.png 1x" width="240" height="46" alt="New Zealand Government" />
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Footer;
