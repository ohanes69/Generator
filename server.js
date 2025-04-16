// server.js
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Autoriser les appels depuis ton frontend

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Route pour l'inscription
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Compte créé !', data });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

// Route pour récupérer depuis la console les données clients
app.get('/api/get-data', async (req, res) => {
    const { data, error } = await supabase
        .from('clients')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});