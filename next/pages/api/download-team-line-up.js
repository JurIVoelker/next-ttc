export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(404).json({ message: "not found" });
}
