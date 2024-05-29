const homepage = async(req,res) => {
    try {
        res.status(200).send({
            message:"Welcome to booking app home server"
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

export default {homepage}