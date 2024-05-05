export async function getHello(): Promise<string> {
  const response = await fetch("/api");
  const result = await response.text();
  return result;
}
