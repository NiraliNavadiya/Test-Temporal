export const createActivities = (name: string) => ({
  async greet(msg: string): Promise<string> {
    return `👋 ${name}`;
  },
  async greet_es(mensaje: string): Promise<string> {
    return `greet_es`;
  },
});
