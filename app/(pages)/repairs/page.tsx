import { RepairsTable } from "./sections/RepairsTable";

async function getRepairs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/repairs`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch repairs");
  }

  return res.json();
}

export default async function RepairsPage() {
  const repairs = await getRepairs();

  return (
    <div className="mt-12">
      <RepairsTable repairs={repairs} />
    </div>
  );
}
