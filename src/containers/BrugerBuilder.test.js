import React from 'react'

//Testing
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

//Component
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../components/Burgers/BuildControls/BuildControls';


configure({ adapter: new Adapter() }); //Connecting Enzyme to React

//Test Logic
describe("<BurgerBuilder />", () =>
{
	let wrapper;

	beforeEach(() =>
	{
		wrapper = shallow(<BurgerBuilder initIngredients={() => {}}/>) //Creating shallow component.
	})

	//Display build controls if have ings prop
	it("should render <BuildControls /> if has ings", () =>
	{
		wrapper.setProps({ ings: {salad:0}}) //Assigning props to component
		expect(wrapper.find(BuildControls)).toHaveLength(1)
	})
})