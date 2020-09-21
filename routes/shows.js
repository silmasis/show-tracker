const router = require('express').Router();
let Show = require('../models/show.model');

router.route('/').get((req, res) => {
    Show.find()
        .then(shows => res.json(shows))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const title = req.body.title;
    const site = req.body.site;
    const episodes = Number(req.body.episodes);

    const newShow = new Show({
        username,
        title,
        site,
        episodes,
    });

    newShow.save()
        .then(() => res.json('Show added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Show.findById(req.params.id)
        .then(Show => res.json(Show))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Show.findByIdAndDelete(req.params.id)
        .then(() => res.json('Show deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Show.findById(req.params.id)
        .then(show => {
            show.username = req.body.username;
            show.title = req.body.title;
            show.site = req.body.site;
            show.episodes = Number(req.body.episodes);

            show.save()
                .then(() => res.json('Show added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;