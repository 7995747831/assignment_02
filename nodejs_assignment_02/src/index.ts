import express, { Request, Response } from 'express';
import * as userService from './userService';
 
const app = express();
app.use(express.json());
 
const PORT = 8000;
 
app.get('/users', async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
 
app.get('/users/:id', async (req: Request, res: Response): Promise<any> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid user ID' });
 
  try {
    const user = await userService.getUserById(id);
    user ? res.status(200).json(user) : res.status(404).json({ error: 'User not found' });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});
 
app.post('/users', async (req: Request, res: Response): Promise<any> => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });
 
  try {
    const newUser = await userService.createUser(name, email);
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});
 
app.put('/users/:id', async (req: Request, res: Response): Promise<any> => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  if (isNaN(id) || !name || !email) return res.status(400).json({ error: 'Invalid data' });
 
  try {
    const updatedUser = await userService.updateUser(id, name, email);
    updatedUser
      ? res.status(200).json({ message: 'User updated', user: updatedUser })
      : res.status(404).json({ error: 'User not found' });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});
 
app.delete('/users/:id', async (req: Request, res: Response): Promise<any> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid user ID' });
 
  try {
    const deletedUser = await userService.deleteUser(id);
    deletedUser
      ? res.status(200).json({ message: 'User deleted', user: deletedUser })
      : res.status(404).json({ error: 'User not found' });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});
 
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 