import express, {Request, Response} from "express"
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db";

connectDB();
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "20kb"}));
app.use(express.urlencoded({extended: true, limit: "20kb"}));

app.get("/api/users", async (req: Request, res: Response) => {
    const userData = [
        {
            id: 1,
            name: "ujjwal gaekwad",
            age: 19
        },
        {
            id: 2,
            name: "Dhvanit monpara",
            age: 19
        },
        {
            id: 3,
            name: "Satish Vaishnav",
            age: 19
        }
    ]

    setTimeout(() => {
        res.send(userData);
    }, 3000)
})

app.listen(process.env.PORT, () => {
    console.log(`server is running at:${process.env.PORT}`);
})

