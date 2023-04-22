
const cartAddition = require('./functions/cartAddition');
const login = require('./functions/login');
const nodemailer = require('nodemailer');

module.exports = router=>{




    router.post('/registerUser', cors(), (req, res) => {

        const email = req.body.email;
        console.log(email);

        const password = req.body.password;
        console.log(password);

        const firstname = req.body.firstname;
        console.log(firstname);
        const lastname = req.body.lastname;
        console.log(lastname);
        const dateofbirth = req.body.dateofbirth;
        console.log(dateofbirth);
        const phonenumber = parseInt(req.body.phonenumber);
        console.log(phonenumber);
        const retypepassword = req.body.retypepassword;
        console.log(retypepassword);
        const usertype = req.body.usertype;
        console.log(usertype);


        if (!email || !password || !firstname || !lastname || !dateofbirth || !phonenumber || !retypepassword || !usertype) {

            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {

            registerUser
                .registerUser(email, password, retypepassword, firstname, lastname, dateofbirth, phonenumber,usertype)
                .then(result => {

                    res.send({
                        "message": "user has been registered successfully",
                        "status": true,


                    });


                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }).json({
                    status: err.status
                }));
        }
    });

    router.post('/login', cors(), (req, res) => {
        console.log("entering login function in functions ");
        const emailid = req.body.email;
        console.log(emailid);
        const passwordid = req.body.password;
        console.log(passwordid);
       
        login
            .loginUser(emailid, passwordid)
            .then(result => {

                console.log("result ===>>>",result.users.usertype)


                res.send({
                    "message": "Login Successful",
                    "status": true,
                    "usertype":result.users.usertype

                });

            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));

    });


    router.post('/addCart', cors(), (req, res) => {

        var requestid = "";
        var possible = "0123456789674736728367382772898366377267489457636736273448732432642326734"
        for (var i = 0; i < 3; i++)
            requestid += (possible.charAt(Math.floor(Math.random() * possible.length))).toString();
        console.log("requestid" + requestid)
        var transactionstring =req.body.transactionstring;
        console.log("line number 212-------->",transactionstring)
        
        var transactionstring =req.body.transactionstring;
        console.log("line number 212-------->",transactionstring)

        cartAddition.cartAddition(requestid,transactionstring)
            
        .then(result => {

                console.log(result);
                res.send({
                    "message": result.message,
                    "requestid": requestid,
                    "status": true


                });
            })

            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));

    });


    router.post('/mail', cors(), (req, res) => {



        var email = req.body.email;
        console.log("email", email);
       


        if (!email) {

            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {
            var encodedMail = req.body.email;
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'shivanimuniraj@gmail.com',
                  pass: 'Shivanisri@17'
                }
              });
          
            
              var mailOptions = {
                from: 'shivanimuniraj@gmail.com',
                to: encodedMail,
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
              };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Mail send error: ", error);
                    return resolve({
                        "status":400,
                        "message":"Mail send error"
                    })
                }
                else {
                    console.log('Email sent: ' + info.response);
                    return resolve({
                        "status":200,
                        "message":info.response
                    })
                  }
            });
            
               
        }
    });

}