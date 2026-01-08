import { Router } from 'express';
import { users } from '../data/Users'
import { User } from '../models/User';

const router = Router();

// GET all users
router.get('/', (req, res) => {
    res.json('users');
})

// GET user by ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(user);
    }
});

// POST new user
router.post('/', (req, res) => {
    const newUser: User = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT update user
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    users[index] = {
        ...users[index],
        name: req.body.name,
        email: req.body.email
    };
    res.json(users[index]);
});

//DELETE user
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    users.splice(index, 1);
    res.status(200).send();
});

export default router;
