import express from "express"
import cors from "cors"

const app = express()

app.use(cors());

app.use(express.json({limit: "500kb"}));

app.use(express.urlencoded(                    
    {
        extended: true,
        limit: "300kb"
}))

app.use(express.static("public"));

import scrapeRouter from './routes/scrape.route.js';

app.use('/api/scrape', scrapeRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

