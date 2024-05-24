export async function json(...args: Parameters<typeof fetch>) {
  const result = await fetch(...args);

  return result.json();
}

export default json;
