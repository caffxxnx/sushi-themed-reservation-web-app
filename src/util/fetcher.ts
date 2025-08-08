const fetcher = async (...args: [RequestInfo, RequestInit?]) => {
  const res = await fetch(...args);

  if (!res.ok) {
    const errorMessage = await res.json();
    throw new Error(errorMessage.error || 'Unknown error');
  }
  return res.json();
};

export default fetcher;
