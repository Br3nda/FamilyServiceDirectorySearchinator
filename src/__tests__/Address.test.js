import { mount, shallow } from 'enzyme';
import Address from '../components/Address';
import { ListGroupItem } from 'react-bootstrap';
import React from 'react';
import { spy } from 'sinon';

describe('Form', () => {
  const minProps = {
    record: {
      a: '123'
    }
  };
  it('submit event when click submit', () => {
    const callback = spy();
    const wrapper = mount(<Address {...minProps}/>);
    wrapper.find('button').simulate('click');
  });
});
