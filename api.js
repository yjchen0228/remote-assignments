const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'database.cqgs0wm6dgxp.us-west-1.rds.amazonaws.com',
    user: 'yjchen',
    password: 'nick0228',
    database: 'assignment'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


const bcrypt = require('bcrypt');

app.use(express.json());


app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    const requestDate = req.header('Request-Date');

    // Validate input data
    const nameRegex = /^[a-zA-Z0-9]{1,50}$/;  // Accepts only letters and spaces, up to 50 characters.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation.
    const passwordPatterns = [
        /[A-Z]/,          // Uppercase letters
        /[a-z]/,          // Lowercase letters
        /[0-9]/,          // Numbers
        /[~`! @#$%^&*()_+\-={[}\]|:;"'<,>.?/]/  // Symbols
    ];

    // Check each pattern and count how many are matched
    let matchCount = passwordPatterns.reduce((count, pattern) => {
        return count + (pattern.test(password) ? 1 : 0);
    }, 0);

    // Check if the password matches at least 3 patterns
    const isPasswordStrong = matchCount >= 3;
    if (!nameRegex.test(name)) {
    console.log('Name validation failed');
} else if (!emailRegex.test(email)) {
    console.log('Email validation failed');
} else if (!isPasswordStrong) {
    console.log('Password validation failed');
}
    if (!nameRegex.test(name) || !emailRegex.test(email) || !isPasswordStrong) {
        return res.status(400).json({ error: 'Invalid input data' });
    }


    try {
        // Check if email already exists
        const [users] = await db.promise().query('SELECT * FROM user WHERE email = ?', [email]);
        if (users.length > 0) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        const userId = Math.floor(Math.random() * 1000000);

        // Convert RFC2616 date to MySQL datetime format
        const requestDateMySQLFormat = new Date(requestDate).toISOString().slice(0, 19).replace('T', ' ');

        // Insert user into database
        const [result] = await db.promise().query('INSERT INTO user (id, name, email, password, created_at) VALUES (?, ?, ?, ?, ?)', [userId, name, email, password, requestDateMySQLFormat]);

        // Return success response
        res.status(200).json({
            data: {
                user: {
                    id: userId,
                    name,
                    email
                },
                "request-date": requestDate
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/users', async (req, res) => {
    const { id } = req.query;
    const requestDate = req.header('Request-Date');
    // Validate ID
    if (!id || !Number.isInteger(Number(id))) {
        return res.status(400).json({ error: 'Invalid ID parameter' });
    }

    try {
        // Retrieve user data
        const [users] = await db.promise().query('SELECT * FROM user WHERE id = ?', [id]);
        if (users.length === 0) {
            return res.status(403).json({ error: 'User not found' });
        }

        // Return user data
        const user = users[0];
        res.status(200).json({
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                "request-date": user.created_at
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
