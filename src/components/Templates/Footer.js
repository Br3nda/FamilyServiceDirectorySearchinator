import React from 'react';
import '../../styles/Footer.css';


class Footer extends React.Component {

  render(){
    return (
      <div className="footer" aria-label="Footer" role="contentinfo">
        <div className="container">
          <div className="footer-item">
            <p>Data sourced from <a href="https://data.govt.nz">data.govt.nz</a></p>
          </div>
          <div className="footer-push">
            <div className="footer-icons">
              <a href="https://www.govt.nz" className="ga-track-logo-footer-aog footer-hm-link">
                <img src="/footer-logo-govt.png" srcSet="/footer-logo-govt@2x.png 2x,/footer-logo-govt.png 1x" width="240" height="46" alt="New Zealand Government" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
