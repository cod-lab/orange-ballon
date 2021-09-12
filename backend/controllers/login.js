import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import userModel from '../models/user.js';

import { tryCatchUtility } from '../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../utils/errHandling/generateErr.js';

export let key;
// let key;     // also working fine
export const verifyLoggerController = tryCatchUtility(async (req, res, next) => {
    const { email, password } = req.body;

    // let userData;
    // tryCatchUtility(async() => {
    //     userData = await userModel.findOne({ email }).lean();     // extract all the user data from db
    //     throw new generateErrUtility(error);
    // });

        // userData = await userModel.findOne({ email }).lean()     // extract all the user data from db
        // .then(() => {
        //     if(!userData) throw new generateErrUtility('invalid credentials',401);     // handle userData value(LHS)
        // })
        // .catch(error => new generateErrUtility(error));

    // try {
        // check email
        const response = await userModel.findOne({ email }).lean();     // extract all the user data from db
        // console.log(response);
    // } catch (error) {
    //     return next(error);     // handle await stmt(RHS)
    // }
    if(!response) throw new generateErrUtility('Invalid credentials!',401);     // handle userData value(LHS)

    // let isValidPass;
    // try {
        // check password
        const isPassValid = await bcrypt.compare(password, response.password);
    // } catch (error) {
        // return next(error);     // handle await stmt(RHS)
    // }
    if(!isPassValid) throw new generateErrUtility('Invalid credentials!',401);     // handle isPassValid value(LHS)

    // create token
    // console.log(process.env.SERVER_SECRET,typeof process.env.SERVER_SECRET);
    // console.log(Math.random() * 73478632587412567,typeof (Math.random() * 73478632587412567));
    // console.log(process.env.SERVER_SECRET + Math.random() * 73478632587412567,typeof (process.env.SERVER_SECRET + Math.random() * 73478632587412567));
    key = process.env.SERVER_SECRET + (Math.random() * 73478632587412567);
    // console.log('\nlogin-key',key,'\n');
    // let token;
    // try {
        const token = jwt.sign(     // data will be sent to end user in token, so it must hv specific required info only
            { userid: response._id, username: response.username, group: response.ownership },
            // { uid: userData._id },
            // process.env.SERVER_SECRET,
            key,
            { expiresIn: "12h" }
        );
    // } catch (error) {
        // return next(error);     // handle internal errs(RHS)
    // }
    if(!token) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);     // handle token value(LHS)

    // req.key = key;
    req.userRole = response.ownership;
    // res.status(200).json({ msg: 'login successfully', token: token });      // also decide here where to go - user or admin
    console.log(`{ token: ${token} }`);
    next();

    // res.send('yoo..testing!');
});
// export { key };

