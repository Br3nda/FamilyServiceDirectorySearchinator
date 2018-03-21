import React from 'react';
import { mount } from 'enzyme';
import Sharebar from '../components/Social/Sharebar';

describe('Sharebar', () => {
  let props;
  let mountedSharebar;
  const thebar = () => {
    if (!mountedSharebar) {
      mountedSharebar = mount(
        <Sharebar {...props} />
      );
    }
    return mountedSharebar;
  };

  beforeEach(() => {
    props = {
      url: undefined,
      subject: undefined,
      description: undefined
    };
    mountedSharebar = undefined;
  });

  it('it will render default share options if there\'s no properties', () => {
    const uls = thebar().find('a');
    expect(uls.length).toBe(3);
  });

});