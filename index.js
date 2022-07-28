console.log("iniciando");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const xmlgen = require("facturacionelectronicapy-xmlgen").default;
const xmlsign = require("facturacionelectronicapy-xmlsign").default;
const setApi = require("facturacionelectronicapy-setapi").default;
const qrgen = require("facturacionelectronicapy-qrgen").default;
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", async (req, res) => {
  res.send("Facturacion");
});
app.post("/enviar", async (req, res) => {
  try {
    let codigoSeguridad = Math.round(Math.random() * 999999);
    // let item = JSON.parse(req.body.items);
    // let items = [];
    // for (i = 0; i < item.length; i++) {
    //   items.push(JSON.parse(item[i]));
    // }
    // let tipo = {};
    // console.log(req.body.tipo);
    // if (req.body.tipo == "Contado") {
    //   tipo = {
    //     tipo: 1,
    //     entregas: [
    //       {
    //         tipo: 1,
    //         monto: "150000",
    //         moneda: req.body.moneda,
    //         cambio: 0,
    //       },
    //     ],
    //   };
    // } else {
    //   tipo = {
    //     tipo: 2,

    //     credito: {
    //       tipo: 2,
    //       plazo: "",
    //       cuotas: 1,
    //       montoEntrega: 0,
    //       infoCuotas: [
    //         {
    //           moneda: req.body.moneda,
    //           monto: req.body.total,
    //           vencimiento: "2022-06-15",
    //         },
    //       ],
    //     },
    //   };
    // }
    // console.log(tipo);
    let data1 = {
      version: 150,
      fechaFirmaDigital: "2022-07-5T00:00:00",
      ruc: "3997053-1",
      razonSocial:
        "DE generado en ambiente de prueba - sin valor comercial ni fiscal",
      nombreFantasia:
        "DE generado en ambiente de prueba - sin valor comercial ni fiscal",
      actividadesEconomicas: [
        {
          codigo: "62010",
          descripcion: "ACTIVIDADES DE PROGRAMACIÓN INFORMÁTICA",
        },
      ],
      timbradoNumero: "12559590",
      timbradoFecha: "2022-06-21T00:00:00",
      tipoContribuyente: 2,
      tipoRegimen: 8,
      establecimientos: [
        {
          codigo: "001",
          direccion: "Barrio Carolina",
          numeroCasa: 1937,
          complementoDireccion1: "11 DE SETIEMBRE 1937 CASI HUMAITA",
          complementoDireccion2: "11 DE SETIEMBRE 1937 CASI HUMAITA",
          departamento: 1,
          departamentoDescripcion: "CAPITAL",
          distrito: 1,
          distritoDescripcion: "ASUNCION (DISTRITO)",
          ciudad: 1,
          ciudadDescripcion: "ASUNCION (DISTRITO)",
          telefono: "1234567",
          email: "DIELOSI@GMAIL.COM",
          denominacion: "Sucursal 1",
        },
      ],
    };

    let data2 = {
      tipoDocumento: 1,
      establecimiento: 1,
      codigoSeguridadAleatorio: "298398",
      punto: "002",
      numero: 103300,
      descripcion: "",
      observacion: "",
      fecha: "2022-06-30T10:11:00",
      tipoEmision: 1,
      tipoTransaccion: 1,
      tipoImpuesto: 1,
      moneda: "USD",
      condicionTipoCambio: 1,
      cambio: "6852.00",
      cliente: {
        contribuyente: true,
        ruc: "80007801-2",
        razonSocial: "",
        tipoOperacion: 1,
        direccion: "",
        numeroCasa: "0",
        departamento: 11,
        departamentoDescripcion: "ALTO PARANA",
        distrito: 211,
        distritoDescripcion: "LOS CEDRALES",
        ciudad: 5695,
        ciudadDescripcion: "LOS CEDRALES",
        pais: "PRY",
        paisDescripcion: "PARAGUAY",
        tipoContribuyente: 2,
        documentoTipo: 1,
        documentoNumero: "",
        telefono: "",
        celular: "",
        email: "",
        codigo: 712,
      },
      // usuario: {
      //   documentoTipo: 1,
      //   documentoNumero: "4578155-9",
      //   nombre: "MIRIA RODRIGUEZ",
      //   cargo: "ADMINISTRADOR",
      // },
      factura: {
        presencia: 4,
      },
      condicion: {
        tipo: 2,
        credito: {
          tipo: 2,
          plazo: "20",
          cuotas: 1,
          montoEntrega: 0,
          infoCuotas: [
            {
              moneda: "USD",
              monto: "23401.18",
              vencimiento: "2022-06-15",
            },
          ],
        },
      },
      items: [
        {
          codigo: "9123",
          descripcion: "SOJA EN GRANOS - TONELADAS",
          observacion: "",
          unidadMedida: 99,
          cantidad: "37.194",
          precioUnitario: "629.1654",
          cambio: "6852.00",
          ivaTipo: 4,
          ivaBase: 50,
          iva: 5,
          lote: null,
          vencimiento: null,
          numeroSerie: "",
          numeroPedido: "",
          numeroSeguimiento: "",
        },
      ],
    };
    // console.log(req.body.cambio);
    // let data2 = {
    //   tipoDocumento: 1,
    //   establecimiento: "01",
    //   codigoSeguridadAleatorio: codigoSeguridad,
    //   punto: "002",
    //   numero: 1017700,
    //   descripcion: "",
    //   observacion: "",
    //   fecha: "2022-06-30T10:11:00",
    //   tipoEmision: 1,
    //   tipoTransaccion: 1,
    //   tipoImpuesto: 1,
    //   moneda: req.body.moneda,
    //   condicionTipoCambio: 1,
    //   cambio: req.body.cambio,
    //   cliente: {
    //     contribuyente: true,
    //     ruc: "80007801-2",
    //     razonSocial: req.body.cliente,
    //     nombreFantasia: "",
    //     tipoOperacion: 1,
    //     direccion: req.body.dirCliente,
    //     numeroCasa: "0",
    //     departamento: 11,
    //     departamentoDescripcion: "",
    //     distrito: 211,
    //     distritoDescripcion: "",
    //     ciudad: 5695,
    //     ciudadDescripcion: "",
    //     pais: "PRY",
    //     paisDescripcion: "Paraguay",
    //     tipoContribuyente: 2,
    //     documentoTipo: 1,
    //     documentoNumero: "",
    //     telefono: "1234567",
    //     celular: "",
    //     email: "",
    //     codigo: 712,
    //   },

    //   factura: {
    //     presencia: 1,
    //   },
    //   condicion: tipo,
    //   items: items,
    // };

    // console.log(data2);

    let response = "";
    let hoy = new Date();
    let ahora =
      hoy.getDate() +
      "_" +
      (hoy.getMonth() + 1) +
      "_" +
      hoy.getFullYear() +
      "_" +
      hoy.getHours() +
      "_" +
      hoy.getMinutes() +
      "_" +
      hoy.getSeconds();
    await xmlgen
      .generateXMLDE(data1, data2)
      .then(async (xml) => {
        console.log("xml generado");
        await xmlsign
          .signXML(xml, "./3997053.pfx", "Die1905982022")
          .then(async (xmlFirmado) => {
            console.log("xml firmado");

            await qrgen
              .generateQR(
                xmlFirmado,
                "1",
                "ABCD0000000000000000000000000000",
                "test"
              )
              .then(async (xmlqr) => {
                console.log("qr generado");

                // var xmlFormateado = xmlFirmado.replace(/(\r\n|\n|\r)/gm, "");

                // try {
                //   const data = fs.writeFileSync(
                //     "xmls/" +
                //       req.body.cliente +
                //       "-Fecha=" +
                //       req.body.fechaVenta +
                //       "-envio=" +
                //       ahora +
                //       ".xml",
                //     xmlFormateado
                //   );
                // } catch (e) {
                //   console.log(e);
                // }
                await setApi
                  .recibe(
                    "100",
                    xmlqr,
                    "test",
                    "./3997053.pfx",
                    "Die1905982022"
                  )
                  .then(async (xml) => {
                    console.log("enviando");
                    response = xml;
                    console.log(response);
                  })
                  .catch((e) => {
                    response = e;
                    console.log(e);
                  });
              });
          })
          .catch((error) => {
            console.log(error);
          });
        console.log("firma");
      })
      .catch((error) => {
        console.log(error);
      });

    // res.send(req.body)

    console.log("------------------------------");
    console.log("------------------------------");
    let respon = response;
    res.send(respon);
  } catch (e) {
    console.log(e);

    res.send("Ocurrio un error: ");
  }
});
app.post("/consultaruc", async (req, res) => {
  try {
    let response = "";
    setApi
      .consultaRUC("1", "3997053", "test", "./3997053.pfx", "Die1905982022")
      .then((xml) => {
        // response = JSON.stringify(xml);
        let logXml = JSON.stringify(xml);
        console.log(logXml);
        response = xml;
      });

    res.send(response);
  } catch (e) {
    console.log(e);

    res.send("Ocurrio un error: ");
  }
});
app.post("/consultaruc", async (req, res) => {
  try {
  } catch (e) {
    console.log(e);

    res.send("Ocurrio un error: ");
  }
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
// app.listen(3000, "127.0.0.1", () => {
//   console.log("Servidor corriendo en puerto 3000");
// });
