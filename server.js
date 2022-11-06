import app from "./src/app.js";

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});