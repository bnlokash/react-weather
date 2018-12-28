import React from 'react';
import renderer from 'react-test-renderer';

import Navbar from '../Navbar';
import SELECTED from '../navbarConstants';

test('Button text changes class when clicked', ()=>{
  let testState = (() =>{
    let _selected = null;
    return {
      setState: function(selected) {
        _selected = selected;
      }
    }
  })();

  const component = renderer.create(
    <Navbar selectFunc={testState.setState}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.children[1].props.onClick();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.children[2].props.onClick();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot(); 

});
