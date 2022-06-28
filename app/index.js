const express = require("express");
const app = express();
const xmlgen = require("facturacionelectronicapy-xmlgen").default;
const xmlsign = require("facturacionelectronicapy-xmlsign").default;
const setApi = require("facturacionelectronicapy-setapi").default;
const qrgen = require("facturacionelectronicapy-qrgen").default;
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/enviar", async (req, res) => {
  try {
    let response = await envia(req.body.data1, req.body.data2);
    // res.send(req.body);
    console.log("res", response);
    res.send(response);
  } catch (e) {
    res.send("Ocurrio un error: " + e);
  }
});
app.listen(3000, () => {
  console.log("Servidor corriendo");
});
async function envia(data1, data2) {
  await xmlgen
    .generateXMLDE(data1, data2)
    .then(async (xml) => {
      await xmlsign
        .signXML(xml, "./3997053.pfx", "Die1905982022")
        .then(async (xmlFirmado) => {
          await qrgen.generateQR(xmlFirmado).then(async (xmlqr) => {
            // console.log(xmlqr);
            try {
              const data = fs.writeFileSync(data2.cliente.ruc + ".xml", xmlqr);
            } catch (e) {
              console.log(e);
            }
            await setApi
              .evento(1, xmlqr, "test", "./3997053.pfx", "Die1905982022")
              .then(async (xml) => {
                console.log(JSON.stringify(xml));
                return await "success";
                // return JSON.stringify(await xml);
              })
              .catch((e) => {
                console.log(e);
              });
          });
        });
    })
    .catch((error) => {
      console.log(error);
    });
}
