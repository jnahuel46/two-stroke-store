export const getRepairs = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/repairs`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
