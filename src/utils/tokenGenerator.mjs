import  jwt  from 'jsonwebtoken';

export const tokenize = (payload) => {
    return jwt.sign(payload, process.env.APP_KEY, {expiresIn: '1d'});
}

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.APP_KEY);
        if(!decoded) {
            return false;
        }
        return decoded;
    } catch (error) {
        console.log(error);
    }
}