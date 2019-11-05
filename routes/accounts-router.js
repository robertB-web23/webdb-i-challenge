const router = require('express').Router();

const Accounts = require('./accounts-model.js');



// GET routes //

router.get('/', (req, res) => {
    
    Accounts.get().limit(req.query.limit)
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => {
            res.status(500).json({message: "unable to retrieve accounts."})
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    Accounts.getById(id)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to retrieve account by ID", error})
        })
})

// Post new account //

router.post('/', (req, res) => {
    const newAccount = req.body;
        console.log(newAccount)
    Accounts.insert(newAccount)
        .then(account => {
            res.status(201).json(account)
        })
        .catch(error => {
            res.status(500).json(error)
        }) 
})

// PUT update account //

router.put('/:id',validateAccountId, (req, res) => {
    const id = req.params.id;
    const changes = req.body
    
    Accounts.update(id, changes)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to update account"})
        })
})

// DELETE delete account

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Accounts.remove(id)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})


// middleware // 

function validateAccountId(req, res, next) {
    const id = req.params.id;

    Accounts.getById(id)
        .then(account => {
            if(!account) {
                return  res.status(400).json({ message: "invalid account id"})
            }
        next()
        })
        .catch(error => {
            res.status(500).json(error)
        })
};



module.exports = router;