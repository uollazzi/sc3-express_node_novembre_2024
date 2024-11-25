import express, { Request, Response, NextFunction } from "express";
import logMiddleware from "./log.middleware";
import data from "./data";

const app = express();
const port = 3000;

app.set("views", "./src/views");
app.set("view engine", "hbs");

app.use(logMiddleware);
app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
    res.render("index", { title: "My Ecommerce", prodotti: data });
});

app.get("/prodotti/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const idNumber = parseInt(id);

    if (isNaN(idNumber)) {
        res.status(400).render("error", { title: "Errore", message: "Formato id non corretto" });
        return;
    }

    const prodotto = data.find(p => p.id == idNumber);
    if (prodotto) {
        const prezzoScontato = prodotto.price - (prodotto.price * prodotto.discountPercentage / 100);
        const prodottoEsteso = { ...prodotto, prezzoScontato: prezzoScontato };

        res.render("prodotto", { title: "My Ecommerce - " + prodotto.title, prodotto: prodottoEsteso });
        return;
    } else {
        res.status(404).render("404", { title: "Non trovato", message: `Prodotto con id ${idNumber} non trovato.` })
        return;
    }
});

app.use((req: Request, res: Response) => {
    res.status(404).render("404", { title: "My Ecommerce - Pagina non trovata", message: "Saluti!" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).render("error", { title: "My Ecommerce - Errore", message: err.message });
});

app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});