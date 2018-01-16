import { MemoryRouter } from 'react-router'
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import Task from './Task';

let task = {id: 1, name: 'test task'}
let taskPage = <MemoryRouter><Task task={task} listId='1'/></MemoryRouter>

describe('Task', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(taskPage)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('shows task name in input', () => {
      const comp = mount(taskPage)
      expect(comp.find('a.button.input').text()).toEqual('test task')
    });

    it('shows horizontal stroke on input when completed', () => {
        task.completed = true
        const comp = mount(taskPage)
        expect(comp.find('del').exists()).toEqual(true)
    });

    it('shows task name in input when completed', () => {
        task.completed = true
        const comp = mount(taskPage)
        expect(comp.find('del').text()).toEqual('test task')
    });

    it('has a complete button', () => {
        const comp = mount(taskPage)
        expect(comp.find('a.button.is-success').exists()).toEqual(true)
    });

    it('set task to completed', () => {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
        wrapper.find('a.button.input').simulate('click');
        expect(onButtonClick.calledOnce).to.equal(true);
    })
})
