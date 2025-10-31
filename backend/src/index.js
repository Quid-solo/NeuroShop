import express from "express"
import cors from "cors"

const app = express()

const corsOptions = {
    origin: process.env.FRONTEND_ORIGIN || true,
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json({limit: "500kb"}));

app.use(express.urlencoded(                    
    {
        extended: true,
        limit: "300kb"
}))

app.use(express.static("public"));

import scrapeRouter from './routes/scrape.route.js';

app.use('/api/scrape', scrapeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

