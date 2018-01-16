import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import BasePage from './BasePage';
import LoginPage from './LoginPage';

describe('Renders base page', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<BasePage/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('shows login page when token is not set', () => {
  //   const basePage = shallow(<BasePage/>)
  //   expect(basePage.find(LoginPage)).to.have.length(1)
  // });
})
