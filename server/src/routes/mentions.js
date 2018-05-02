import { Router } from 'express';
import db from '../db';

let router = Router();

router.post('/:id?', (req, res) => {
    let id = req.params.id;
    db.addMentions(id, req.body.number)
    .then((result) => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
    })
});

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