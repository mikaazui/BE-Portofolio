export const Validate = (schema, data, res) => {
    const result = schema.validate(data) 

   if (result.error) {
    throw result.error;
   } else {
    return result.value
   }
}

