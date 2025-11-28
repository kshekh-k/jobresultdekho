export function generateWords(count: number, min: number, max: number) {
  const chars = "abcdefghijklmnopqrstuvwxyz";

  const randomWord = () => {
    const length = Math.floor(Math.random() * (max - min + 1)) + min;
    let w = "";
    for (let i = 0; i < length; i++) {
      w += chars[Math.floor(Math.random() * chars.length)];
    }
    return w;
  };

  const out: string[] = [];
  for (let i = 0; i < count; i++) out.push(randomWord());
  return out;
}
