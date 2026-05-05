import {Router} from "express"

// creo un router
const router = Router()

// creo la ruta get
router.get("/", (req, res) => {
    res.json([])
})

export default router;