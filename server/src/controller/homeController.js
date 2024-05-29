const homepage = async(req,res) => {
    try {
        res.status(200).send({
            message:"homepage"
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}