export default function format(timestamp) {
  const time = new Date(timestamp * 1000);
  return time.toLocaleString().split(" ")[0];
}
