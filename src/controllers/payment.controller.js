import { MercadoPagoConfig, Preference } from "mercadopago";
try {
  const createPayment = async (req, res) => {
    const client = new MercadoPagoConfig({
      accessToken: process.env.YOUR_ACCESS_TOKEN,
    });
  };
  const preference = new Preference(client);

   
  const {titulo,cantidad,precio} = req.body 


  const referenciaPago = await preference.create({
    body: {
      items: [
        {
          title: titulo,
          quantity: cantidad,
          unit_price: precio,
        },
      ],
      back_url: {
        success: "https://www.tu-sitio/success",
        failure: "https://www.tu-sitio/failure",
        pending: "https://www.tu-sitio/pending",
      },
    },
  });

  res.status(200).json({
    ok: true,
    id: referenciaPago.id,
  });
} catch (error) {
  res.status(500).json({
    error: error.message,
  });
}

export { createPayment };
