import { NextApiRequest, NextApiResponse } from 'next';
import fetch from "node-fetch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const response = await fetch("https://store.steampowered.com/appreviews/2821220?json=1&filter=recent&cursor=*&review_type=positive");
            const data = await response.json();
            res.status(200).json(data); // Send the response
        } catch (err) {
            res.status(500).json({ error: "Failed to fetch reviews" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });  // Handle non-GET methods
    }
}