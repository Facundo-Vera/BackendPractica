import { MercadoPagoConfig, Preference } from "mercadopago";
try {
  const createPayment = async (req, res) => {
    const client = new MercadoPagoConfig({
      accessToken: process.env.YOUR_ACCESS_TOKEN,
    });
  };
  const preference = new Preference(client);

  const referenciaPago = await preference.create({
    body: {
      items: [
        {
          title: "Mi producto",
          quantity: 1,
          unit_price: 200000,
        },
      ],
      back_urls: {
        success: "https://www.tu-sitio/success",
        failure: "https://www.tu-sitio/failure",
        pending: "https://www.tu-sitio/pending",
      },
      auto_return: "approved",
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
