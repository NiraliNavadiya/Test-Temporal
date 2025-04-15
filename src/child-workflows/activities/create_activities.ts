export const createActivities = () => ({
  async greet(msg: string): Promise<string> {
    return `$greet`;
  },
  async greet_es(mensaje: string): Promise<string> {
    return `greet_es`;
  },
});
