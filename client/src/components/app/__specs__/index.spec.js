import React from 'react'
import { mount, shallow } from 'enzyme'
import login$ from '../../../services/login'
import App from '../index'


jest.mock('../../../services/login', () => require('rxjs').of('some-auth-token'))

describe('App', () => {
    it('should render app with correct properties', () => {
        const wrapper = shallow(<App />)

        expect(wrapper).toMatchSnapshot()
    })
    it('should call login service on mount', () => {
        mount(<App />)
    })
})
