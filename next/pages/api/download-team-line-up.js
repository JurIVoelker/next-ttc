export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "not found" });

  res.status(200).send(mainPlayers);
}
