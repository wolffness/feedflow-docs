export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await response.json();

  if (!data.access_token) {
    return new Response(JSON.stringify({ error: 'Failed to get token', details: data }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const content = JSON.stringify({
    token: data.access_token,
    provider: 'github',
  });

  return new Response(`<!DOCTYPE html><html><body><script>
    (function() {
      function recvMsg(e) {
        window.opener.postMessage(
          'authorization:github:success:${content}',
          e.origin
        );
      }
      window.addEventListener("message", recvMsg, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script></body></html>`, {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' },
  });
}
