import { body } from 'express-validator'

function varchar(name) {
    return body(name)
        .trim()
        .notEmpty()
        .withMessage('Name must not be empty.')
        .isLength({ max: 256 })
        .withMessage('Name can not be more than 256 characters.')
}

function email(name) {
    return body(name)
        .trim()
        .notEmpty()
        .withMessage('Email must not be empty.')
        .isEmail()
        .withMessage('Invalid text for email.')
        .isLength({ max: 256 })
        .withMessage('Email can not be more than 256 characters.')
}

function bool(name) {
    return body(name)
        .isBoolean()
        .withMessage('Admin state must be true or false.')
}

function text(name) {
    return body(name)
        .trim()
}

export {
    varchar,
    email,
    bool,
    text
}