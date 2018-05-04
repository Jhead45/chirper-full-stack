import { Router } from 'express';
import db from '../db';

let router = Router();


router.get('/', (req, res) => {
    let userid = parseInt(req.body.userid);
        db.userMentions(userid)
        .then((result) => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
        })
});





export default router;