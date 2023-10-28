const validation = (schema,source) => {
    return   (req, res, next) => {
           let { error } = schema.validate(req[source]);
           if (error) {
               res.status(401).json({ message: "Err", error })
           } else {
               next()
           }
       }
   
   }
   
   
   export default validation