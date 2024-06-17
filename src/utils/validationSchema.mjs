// utils/validationSchema.mjs
export const createValidationSchema = {
    title: {
        notEmpty: {
            errorMessage: "title cannot be empty"
        },
        isLength: {
            options: { min: 5, max: 40 },
            errorMessage: "title must be between 5 and 40 characters"
        },
        isString: {
            errorMessage: "title must be a string"
        }
    },
    location: {
        notEmpty: {
            errorMessage: "location name cannot be empty"
        },
        isString: {
            errorMessage: "location name must be a string"
        }
    },

    company: {
        notEmpty: {
            errorMessage: "company  cannot be empty"
        },
        isString: {
            errorMessage: " company must be a string"
        }
    },
    price: {
        notEmpty: {
            errorMessage: "name name cannot be empty"
        },
    }
};
