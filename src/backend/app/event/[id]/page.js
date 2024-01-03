async function getData(id) {
  const baseURL = process.env.VERCEL_URL ? `https://api-project-backend-chi.vercel.app` : 'http://localhost:3000';
  const url = `${baseURL}/api/event`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Event({ params }) {
  const { id } = params;
  const data = await getData(id);
  const events = data?.data;
	return (
		<div> {JSON.stringify(events)} </div>
	)
}

