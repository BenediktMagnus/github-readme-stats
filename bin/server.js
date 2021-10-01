'use strict';

require('dotenv').config();

const fs = require('fs');
const express = require('express');

const app = express();
const router = express.Router();
app.use('/api', router);

// Emulate a Vercel environment by autoloading the routes:
fs.readdirSync(
    'api',
    { encoding: 'utf-8' }
).forEach(
    (file) =>
    {
        if (file.indexOf('.') !== -1)
        {
            let route = '/' + file.split('.')[0];

            if (file === 'index.js')
            {
                route = '/';
            }

            router.route(route).get(require('../api/' + file));
        }
    }
);

const port = process.env.port ?? 8080;

app.listen(
    port,
    () =>
    {
        console.log(`Github Readme Stats running on port ${port}.`);
    }
);
