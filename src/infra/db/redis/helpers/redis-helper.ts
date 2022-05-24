import { createClient } from 'redis'

export const RedisHelper = {
  client: typeof createClient,
  uri: null as string,
  async connect (uri: string, password: string): Promise<void> {
    this.uri = uri
    this.client = createClient({
      password 
    })
    await this.client.connect();
  },

  async disconnect () {
    await this.client.disconnect();
  },

  async setInMemory (key: string, value: any) {
    await this.client.set(key, JSON.stringify(value))
  },

  async getInMemory (key: string) {
    const result = await this.client.get(key)
    const parsedResult = JSON.parse(result)
    return parsedResult
  }
}
