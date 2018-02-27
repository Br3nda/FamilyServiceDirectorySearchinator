import React from 'react';
import FilterButton from '../components/FilterButton';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

const record = {
  name: 'Addiction'
};
it('contains 16 <Link /> components', () => {
  const wrapper = shallow(<FilterButton record={record} />);
  expect(wrapper.find(Link).length).toBe(1);
});
