import React from 'react';
import { mount } from 'enzyme';
import Proximity from '../components/Forms/Proximity';

describe('Proximity', () => {
  let props;
  let mountedProximity;
  const rangeslider = () => {
    if (!mountedProximity) {
      mountedProximity = mount(
        <Proximity {...props} />
      );
    }
    return mountedProximity;
  };

  beforeEach(() => {
    props = {
      radius: 50000,
      handler: undefined
    };
    mountedProximity = undefined;
  });

  it('Slider returns default value when "changed"', () => {
    var returnedValue;
    props.addressLatLng = {lat:-41.0,lng: 174.0}; /*roughly the centre of nz */
    props.handler = function(value){
      returnedValue = value;
      /* the default value in the app is 25000, as set in the reducer */
      /* the default returned here is the result of the html element behaviour defaulting to the middle value */
      expect(returnedValue).toBe('50000');
    };
    const ranger = rangeslider().find('input');
    ranger.simulate('change');
  });

  it('Slider returns appropriate value when changed', () => {
    var returnedValue;
    props.addressLatLng = {lat:-41.0,lng: 174.0}; /*roughly the centre of nz */
    props.handler = function(value){
      returnedValue = value;
      expect(returnedValue).toBe('75000');
    };
    const ranger = rangeslider().find('input');
    ranger.instance().value = '75000';
    ranger.simulate('change');
  });



});