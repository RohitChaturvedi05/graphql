const getOptions = ({ headers, ...params }) => ({
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
    },
    timeout: 5000,
    ...params,
})

export default getOptions
