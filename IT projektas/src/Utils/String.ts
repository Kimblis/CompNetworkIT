export const replaceLithuanianLettersInPhrase = (phrase: string) =>
  phrase
    .replace('ą', 'a')
    .replace('č', 'c')
    .replace('ę', 'e')
    .replace('į', 'i')
    .replace('š', 's')
    .replace('ž', 'z')
    .replace('ų', 'u')
    .replace('ū', 'u')
    .replace('ė', 'e');
