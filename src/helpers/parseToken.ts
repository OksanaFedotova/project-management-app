export default function parseToken(token: string) {
  const baseUrl = token.split('.')[1];
  const base = baseUrl.replace(/-/g, '+').replace(/_/g, '/');
  const jsonDecoded = decodeURIComponent(
    atob(base)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonDecoded);
}
