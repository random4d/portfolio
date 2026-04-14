export async function register() {
  if (process.env.HTTPS_PROXY || process.env.https_proxy) {
    const { ProxyAgent, setGlobalDispatcher } = await import('undici');
    const proxyUrl = process.env.HTTPS_PROXY || process.env.https_proxy;
    setGlobalDispatcher(new ProxyAgent(proxyUrl!));
  }
}
