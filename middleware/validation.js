
const validation = (schema) => {
    return   (req, res, next) => {
           let { error } = schema.validate(req.body);
           if (error) {
               res.status(401).json({ message: "Err", error })
           } else {
               next()
           }
       }
   
   }
   
   
   export default validation

