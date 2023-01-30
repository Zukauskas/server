import { file } from "../lib/file.js";

const register = {};

register.init = async (data, httpMethod) => {
    const allowedMethods = ['post'];

    if (allowedMethods.includes(httpMethod)) {
        return await register[httpMethod](data);
    }


    return [false, 'ERROR: HTTP Method not allowed'];
};

register.post = async (data) => {
    const { username, email, password } = data;
    // Validations:

    // Is username valid?
    // Is email valid?
    // Is password valid?

    // Is username already taken?
    // Is email already taken?
    // encrypt password?

    // Try to save user to (file, db, etc...)
    // .data/users/[email].json


    const [err, msg] = await file.create('/users', `${email}.json`, data);

    return [err, err ? "Failed to register new user" : 'User successfully registered'];
};

register.get = () => { };
register.put = () => { };
register.delete = () => { };

export { register };