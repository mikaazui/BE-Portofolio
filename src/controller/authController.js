const login = (req, res) => {

    res.cookie('token', '12345')
    res.cookie('name', 'valent')

    res.status(200).json({
        message: 'login success',
    })

}

const logout = (req, res) => {
    res.clearCookie('token')
    res.clearCookie('name')

    res.status(200).json({
        message: 'logout success'
    })
}

export default {
    login,
    logout
}