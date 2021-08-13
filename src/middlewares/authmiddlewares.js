require('dotenv').config();
const validator = require('validator');
const jwt = require('jsonwebtoken');

const dbUser = require('../controller/model/user');

module.exports.requireLogged = function (req, res, next) {
    if (req.session.token) {
        res.redirect('/me/info');
        return;
    } else {
        return next();
    }
};

module.exports.requireisVip = async function (req, res, next) {
    if (req.session.UserLogin) {
        const user = await dbUser.findOne({_id: req.session.UserLogin.idUser});
        if (user.vip == 1) {
            return next();
        } else {
            return res.redirect('/me/info');
        }
    } else {
        return res.redirect('/me/info');
    }
};

module.exports.requireisLog = function (req, res, next) {
    if (req.session.token) {
        jwt.verify(req.session.token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                return res.redirect('/auth/login');
            } else {
                return next();
            }
        });
    } else {
        return res.redirect('/auth/login');
    }
};

module.exports.requireLogin = function (req, res, next) {
       if (req.session.token) {
        jwt.verify(req.session.token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                return next();
            } else {
                    req.session.UserLogin = {
                        isAdmin: data.isAdmin,
                        idUser: data.idUser,
                        nameUser: data.nameUser,
                        provider: data.provider,
                    }
                    res.locals.nameUser = data.nameUser;
                    res.locals.isAdmin = data.isAdmin;
                    res.locals.myToken = req.session.token;
                    return next();
            }
        })
    } else {
        return next();
    }
};

module.exports.requireAdmin = function (req, res, next) {
    if (req.session.token) {
        jwt.verify(req.session.token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                return res.redirect(`/`);
            } else {
               if (data.isAdmin) {
                   return next()
               } else {
                return res.redirect(`/`);
               }
            }
        })
    } else {
        return res.redirect(`/`);
    }
};

module.exports.checkVip = async function (req, res, next) {
    try {
        if (req.session.UserLogin) {
            const date = new Date();
            const user = await dbUser.findOne({_id: req.session.UserLogin.idUser});
            if (user.vip == 1) {
                const checkVip = Number(user.dateVip) - Number(date);
                if (checkVip<=0) {
                    res.locals.isVip = false;
                    req.session.Vip = {
                        check: 0
                    }
                    await dbUser.updateOne({_id: req.session.UserLogin.idUser}, {vip: 0});
                    return next();
                } else {
                    res.locals.isVip = true;
                    res.locals.dateVip = user.dateVip;
                    req.session.Vip = {
                        check: 1
                    }
                    return next();
                }
            } else {
                res.locals.isVip = false;
                req.session.Vip = {
                    check: 0
                }
                return next();
            }
        } else {
            res.locals.isVip = false;
            req.session.Vip = {
                check: 0
            }
            return next();
        }
    } catch(err) {
        res.locals.isVip = false;
        req.session.Vip = {
            check: 0
        }
        return next();
    }
};

module.exports.clickMax = async function (req, res, next) {
    try {
        if (req.session.token) {
            const date = new Date();
            const user = await dbUser.findOne({_id: req.session.UserLogin.idUser});
            if (user.vip == 1) {
                const checkVip = Number(user.dateVip) - Number(date);
                if (checkVip<=0) {
                    if (user.click < 1000) {
                        return next();
                    } else {
                        return res.redirect(`/me/info`);
                    }
                } else {
                    return next();
                }
            } else {
                if (user.click < 1000) {
                    return next();
                } else {
                    return res.redirect(`/me/info`);
                }
            }
        } else {
            return res.redirect(`/`);
        }
    } catch(err) {
        return res.redirect(`/`);
    }
};
