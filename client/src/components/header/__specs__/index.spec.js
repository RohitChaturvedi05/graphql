import React from 'react'
import TablePagination from '@mui/material/TablePagination'
import { mount, shallow } from 'enzyme'
import getAllUsers from '../../../services/get-all-users'
import Headers from '../index'


describe('Header', () => {
    it('should render Headers with correct properties', () => {
        const wrapper = shallow(<Headers />)
        expect(wrapper).toMatchSnapshot()
    })
})