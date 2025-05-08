import Joi from "joi";

// Validation schemas
const registrationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const bookingSchema = Joi.object({
    activityId: Joi.string().required(),
});

// Middleware functions
export const validateRegistration = (req, res, next) => {
    const { error } = registrationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message,
        });
    }

    next();
};

export const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message,
        });
    }

    next();
};

export const validateBooking = (req, res, next) => {
    const { error } = bookingSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message,
        });
    }

    next();
};
