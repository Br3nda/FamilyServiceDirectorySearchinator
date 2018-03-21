import React from 'react';
import { mount } from 'enzyme';
import ServiceContactDetail from '../components/Service/ServiceContactDetail';

describe('ServiceContactDetail', () => {
  let props;
  let mountedServiceContactDetail;
  const contactDetail = () => {
    if (!mountedServiceContactDetail) {
      mountedServiceContactDetail = mount(
        <ServiceContactDetail {...props} />
      );
    }
    return mountedServiceContactDetail;
  };

  beforeEach(() => {
    props = {
      phone: undefined,
      email: undefined,
      hours: undefined,
      website: undefined
    };
    mountedServiceContactDetail = undefined;
  });

  it('it won\'t render a ul if there\'s no contact details', () => {
    const uls = contactDetail().find('ul');
    expect(uls.length).toBe(0);
  });

  it('it will render just the one li if one property is supplied', () => {
    props.phone = '0123456789';
    const uls = contactDetail().find('li');
    expect(uls.length).toBe(1);
  });

  it('it will render two li if two property is supplied', () => {
    props.hours = 'All the time';
    props.website = 'http://www.test.govt.nz';
    const uls = contactDetail().find('li');
    expect(uls.length).toBe(2);
  });

  it('it will render three li if three property is supplied', () => {
    props.email = 'email@govt.nz';
    props.website = 'http://www.test.govt.nz';
    props.hours = 'All the time';
    const uls = contactDetail().find('li');
    expect(uls.length).toBe(3);
  });

  it('it will render three anchor tags if all properties are supplied', () => {
    props.email = 'email@govt.nz';
    props.website = 'http://www.test.govt.nz';
    props.hours = 'All the time';
    props.phone = '0123456789';
    const uls = contactDetail().find('a');
    expect(uls.length).toBe(3);
  });

});