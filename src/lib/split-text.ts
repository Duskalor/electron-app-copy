export const splitText = (text: string) => {
  return text.split('\n').map((item) => {
    const [name, content] = item.replace(/\s+/g, ' ').trim().split(':');
    return { name, content };
  });
};
