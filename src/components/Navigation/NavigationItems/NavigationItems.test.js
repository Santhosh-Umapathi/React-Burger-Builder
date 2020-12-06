import React from 'react'

//Testing
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

//Component
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'




configure({ adapter: new Adapter() }); //Connecting Enzyme to React

//Test Logic
describe("<NavigationItems />", () =>
{
	let wrapper;

	beforeEach(() =>
	{
		wrapper = shallow(<NavigationItems />) //Creating shallow component.
	})

	//Authentication False
	it("should render 2 <NavigationItem /> if not authenticated", () =>
	{
		expect(wrapper.find(NavigationItem)).toHaveLength(2)
	})

	
	//Authentication True
	it("should render 3 <NavigationItem /> if authenticated", () =>
	{
		wrapper.setProps({state: true}) //Assigning props to component
		expect(wrapper.find(NavigationItem)).toHaveLength(3)
	})

	//Authentication True
	it("should have <NavigationItem>Logout if authenticated", () =>
	{
		wrapper.setProps({state: true}) //Assigning props to component
		expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
	})
	
})