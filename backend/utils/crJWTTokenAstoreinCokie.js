// Creating Token and saving in cookies
//  we can say that it is similar to login
const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken()

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,  // Means this cookie will accessable by only http requests
    }


    console.log("sended post register req")
    res.status(statusCode).cookie("token",token,options).json({
        success: true,
        user,
        token,
    })

}


module.exports = sendToken;