import { Router } from 'express';
// import chirpStore from '../chirpstore';
import db from '../db';

let router = Router();


router.get('/:id?', (req, res) => {
    let id = req.params.id;
    if (id) {
        db.getChirp(id)
        .then((result) =>  {
            res.send(result);})
    } else {
       db.getChirps()
       .then((result) => {
           res.send(result);
       })
    }
});

router.post('/', (req, res) => {
    let userid = parseInt(req.body.userid);
    db.createChirp(userid, req.body.text, req.body.location)
    .then((result) => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
    })
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    db.updateChirp(id, req.body.text)
    .then((result) => {
        res.sendStatus(200);
    })
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    db.deleteChirp(id)
    .then((result) => {
        res.send('success');
    })
});


export default router;