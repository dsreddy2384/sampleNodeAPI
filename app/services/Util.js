// there are many json-schema validators available, I prefer ajv
var Validator = require('swagger-model-validator');
let swagger = require('./../../docs/swagger.json');
var validator = new Validator(swagger);


// validation middleware
module.exports = {
    validateSchema(model) {
        return (req, res, next) => {
            let errors = []
            let reserrors = []
            let valid = swagger.validateModel(model, req.body, false,false)
            if (!valid.valid) {
                errors.push(valid.errors)
            }
            if (errors.length) {
                errors[0].forEach(function (element) {
                    reserrors.push(element.message);
                }, this);
                req.errors =reserrors;
            }
            next()
        }
    }
}