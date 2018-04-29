import React from 'react';
import ShareMail from 'react-icons/lib/fa/envelope-o';
import ShareFacebook from 'react-icons/lib/fa/facebook-square';
import ShareTwitter from 'react-icons/lib/fa/twitter';
import '../../styles/Sharebar.css';

class Sharebar extends React.Component {

  render(){

    let url = (this.props.url) ? this.props.url : window.location.href;
    let subject = (this.props.subject) ? this.props.subject : 'Whānau%20Services%20in%20your%20area';
    let description = (this.props.description) ? this.props.description : subject;


    let mailto = 'mailto:?subject='+subject+'&body='+url;
    let facebook = 'https://www.facebook.com/sharer/sharer.php?u='+url;
    let twitter = 'https://twitter.com/home?status='+description+':%20'+url;

    return (
      <div className="sharebar" aria-label="Sharebar">
        <div className="container">
          <p>Share via: </p>
          <ul className="sharebar-share">
            <li><a href={mailto} title="Share by email"><ShareMail /> Email</a></li>
            <li><a href={facebook} title="Share via Facebook"><ShareFacebook /> Facebook</a></li>
            <li><a href={twitter} title="Share on twitter"><ShareTwitter /> Twitter</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sharebar;
