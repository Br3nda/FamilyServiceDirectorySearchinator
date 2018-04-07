import React from 'react';
import FaPhone from 'react-icons/lib/fa/phone';
import FaMail from 'react-icons/lib/fa/envelope-o';
import FaClock from 'react-icons/lib/fa/clock-o';
import FaExternalLink from 'react-icons/lib/fa/external-link';
import FaMapMarker from 'react-icons/lib/fa/map-marker';
import FaFolderOpen from 'react-icons/lib/fa/folder-open';


class ServiceContactDetail extends React.Component {

  serviceDetailsItem(obj,iconin,valin){
    obj.push({
      icon: iconin,
      val: valin
    });
  }

  serviceDetailsBuilder(){
    let obj = [];
    if(this.props.email)          this.serviceDetailsItem(obj,<FaMail />,<a href={`mailto:${this.props.email}`}>{this.props.email}</a>);
    if(this.props.hours)          this.serviceDetailsItem(obj,<FaClock />,this.props.hours);
    if(this.props.phone)          this.serviceDetailsItem(obj,<FaPhone />,<a href={`tel:${this.props.phone}`}>{this.props.phone}</a>);
    return obj;
  }

  serviceLocationsBuilder(){
    let obj = [];
    if(this.props.address)        this.serviceDetailsItem(obj,<FaMapMarker />,this.props.address);
    if(this.props.website)        this.serviceDetailsItem(obj,<FaExternalLink />, <a href={`${this.props.website}`} target="_blank">{this.props.website}</a>);
    if(this.props.classification) this.serviceDetailsItem(obj,<FaFolderOpen />, this.props.classification);
    return obj;
  }

  listBuilder(source){
    let listitems = source.map((record, i) =>
      <li key={i} className="list-icon">
        <span>{record.icon}</span>
        {record.val}
      </li>
    );
    return listitems;
  }

  render() {
    let thisList = (this.props.locations) ? this.serviceLocationsBuilder() : this.serviceDetailsBuilder();
    if(thisList.length === 0) return null;
    return (
      <ul className="list-stripped">
        {this.listBuilder(thisList)}
      </ul>
    );
  }
}

export default ServiceContactDetail;
