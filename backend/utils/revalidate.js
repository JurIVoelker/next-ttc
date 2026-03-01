async function revalidate(path) {
  let frontendUrl = process.env.NEXT_PUBLIC_URL;
  const secret = process.env.REVALIDATION_SECRET;
  if (!frontendUrl) {
    frontendUrl = "http://localhost:3000";
    console.error("NEXT_PUBLIC_URL is not defined in environment variables.");
  }
  if (!secret) {
    console.error(
      "REVALIDATION_SECRET is not defined in environment variables."
    );
  }
  try {
    const res = await fetch(
      `${frontendUrl}/api/revalidate?secret=${secret}&path=${path}`
    );
    if (!res.ok) {
      console.error("Failed to revalidate path:", res.status);
      return;
    }
    console.info(`Successfully revalidated path: ${path}`);
  } catch (error) {
    console.error(error);
    console.error("Error revalidating path:", error);
  }
}

async function revalidatePaths(paths) {
  console.log("Revalidating paths:", paths);
  const revalidationPromises = paths.map((path) => revalidate(path));
  try {
    await Promise.all(revalidationPromises);
    console.log("All paths revalidated successfully");
  } catch (error) {
    console.error("Error revalidating paths:", error);
  }
}

module.exports = { revalidate, revalidatePaths };
