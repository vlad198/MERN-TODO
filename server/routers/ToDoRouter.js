const router = require('express').Router();
const auth = require('../middleware/AuthMiddleware');
const { check, validationResult } = require('express-validator');

const ToDo = require('../models/Todo');

router.get('/', auth, async (req, res) => {
    try {
        const todos = await ToDo.find({ user: req.user._id });
        res.json(todos);
    } catch (err) {
        res.status(500).json({
            msg : 'Server error'
        });
    }
});

router.post('/', auth,
    [
        check('name', 'Please provide todo').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({error : errors.array()});
        }

        const {name} = req.body;

        try {
            let todo = new ToDo({
                user : req.user._id,
                name
            });

            todo = await todo.save();

            res.status(200).json(todo);

        } catch(err) {
            res.status(500).json({
                msg : 'Server error'
            });
        }

    }
);

router.delete('/:_id',auth, async (req,res) => {
    try {
        let todo = await ToDo.findById(req.params._id);
        if(!todo) {
            return res.status(404).json({msg : 'Todo not found.'});
        }
        await ToDo.findByIdAndDelete(req.params._id);
        res.send('todo deleted');
    } catch(err) {
        res.status(500).json({
            msg : 'Server error'
        });
    }
})



module.exports = router;