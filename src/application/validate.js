export class joiError extends Error {
    constructor(status,message) {
        super(message)
        this.status = status
    }
}

export const Validate = (schema, data, res) => {
    const result = schema.validate(data) 

   if (result.error) {
    throw new joiError(400, result.error.message);
   } else {
    return result.value
   }
}
