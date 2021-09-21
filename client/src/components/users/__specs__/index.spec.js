import React from 'react'
import TablePagination from '@mui/material/TablePagination'
import { mount, shallow } from 'enzyme'
import getAllUsers from '../../../services/get-all-users'
import Row from '../row'
import Users from '../index'


jest.mock('../../../services/get-all-users', () => jest.fn(
    () => require('rxjs').of({
        rowsCount: 2,
        users: [
            { id: '1', firstname: 'fname1', lastname: 'lname1', email: 'fname1@email.com' },
            { id: '2', firstname: 'fname2', lastname: 'lname2', email: 'fname2@email.com' }],
    }))
)

describe('Users', () => {
    it('should render app with correct properties', () => {
        const wrapper = shallow(<Users />)
        expect(wrapper).toMatchSnapshot()
    })

    it('should call getAllUsers', () => {
        const wrapper = mount(<Users />)
        expect(getAllUsers).toHaveBeenCalledWith(1, 10, null)
        expect(wrapper.find(Row)).toHaveLength(2)
    })

    it('should call rows with correct properties', () => {
        const wrapper = mount(<Users />)

        expect(wrapper.find(Row)).toHaveLength(2)
        expect(wrapper.find(Row).at(0).props()).toEqual({
            onDelete: expect.any(Function),
            onEdit: expect.any(Function),
            row: {
                email: 'fname1@email.com',
                firstname: 'fname1',
                id: '1',
                lastname: 'lname1',
            }
        })
    })

    it('should call getAllUsers on page change', () => {
        const wrapper = mount(<Users />)
        const tablePagination = wrapper.find(TablePagination)

        const onPageChange = tablePagination.prop('onPageChange')
        onPageChange({}, 2)

        expect(getAllUsers).lastCalledWith(3, 10, null)
    })
})
