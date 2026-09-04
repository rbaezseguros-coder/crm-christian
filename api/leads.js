export default async function handler(req, res) {
  const GAS_URL = process.env.GAS_URL;
  const GAS_API_KEY = process.env.GAS_API_KEY;

  if (!GAS_URL || !GAS_API_KEY) {
    return res.status(500).json({
      ok: false,
      error: "Faltan las variables de conexión."
    });
  }

  try {
    const accion = req.method === "GET"
      ? "listar"
      : req.body?.accion;

    const payload = {
      apiKey: GAS_API_KEY,
      accion,
      ...(req.body || {})
    };

    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    return res.status(response.ok ? 200 : response.status).json(data);

  } catch (error) {
    console.error("CRM error:", error);

    return res.status(500).json({
      ok: false,
      error: "No se pudo conectar con Google Sheets."
    });
  }
}
