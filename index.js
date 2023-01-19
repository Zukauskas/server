import { server } from "./lib/server.js";

const app = {};


//paleidinejam projekta
app.init = () => {
    // trukstamo pradinio turinio generavimas
    // -- folderiai
    // -- failai
    // gauti prisijungima prie DB
    // uzkurti serveri
    server.init()

    // const timer = setInterval(() => {
    //     console.log("apsivalymas....")

    //     // reguliarus procesai
    //     // - info sinchronizavimas ir atsinaujinimas
    //     // - failu archyvavimas
    //     // - info agregavimas (statistika)
    //     // - nereikalingos info salinimas:
    //     //      - failu trynimas
    //     //      - DB optimizavimas 
    // }, 5000)
}

app.init();

export { app }