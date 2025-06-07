export const handler = async () => {
  const BUILD_HOOK_URL = process.env.BUILD_HOOK_URL;

  if (!BUILD_HOOK_URL) {
    return {
      statusCode: 500,
      body: 'Build hook URL not defined in environment variables.',
    };
  }

  const res = await fetch(BUILD_HOOK_URL, { method: 'POST' });

  if (res.ok) {
    return {
      statusCode: 200,
      body: 'Scheduled build triggered successfully.',
    };
  } else {
    return {
      statusCode: res.status,
      body: 'Failed to trigger build hook.',
    };
  }
};
