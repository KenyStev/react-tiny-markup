import {
  anythingExcept,
  many,
  choice,
  char,
  between,
  str,
  coroutine,
  letters
} from 'arcsecond';

// tag types
enum TokenType {
  openTag = 'open-tag',
  closeTag = 'close-tag',
  text = 'text'
}

// tagger
const tokenTag = (type, customizer = id => id) => value => ({
  type,
  value: customizer(value)
});

// parser
const lAngle = char('<');
const rAngle = char('>');
const openTag = between(lAngle)(rAngle)(letters).map(
  tokenTag(TokenType.openTag)
);
const closeTag = between(str('</'))(rAngle)(letters).map(
  tokenTag(TokenType.closeTag)
);
const text = many(anythingExcept(choice([openTag, closeTag]))).map(
  tokenTag(TokenType.text, val => val.join(''))
);

// order matters
const token = choice([openTag, closeTag, text]);

const tokenize = coroutine(function* () {
  const result = [];

  while (true) {
    const value = yield token;
    if (value.value === '' || value.isError) break;
    result.push(value);
  }

  return result;
});

const structBuilder = (tokens, openTags = []) => {
  const result = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.ignore) continue;
    token.ignore = true;

    switch (token.type) {
      case TokenType.text: {
        const { ignore, ...textObj } = token;
        result.push(textObj);
        break;
      }
      case TokenType.openTag: {
        result.push({
          type: 'tag',
          tagType: token.value,
          value: structBuilder(tokens.slice(i + 1), [...openTags, token.value])
        });

        break;
      }
      case TokenType.closeTag: {
        const lastOpen = openTags[openTags.length - 1];
        if (lastOpen === token.value) {
          return result;
        }

        throw new Error(`Expected ${lastOpen} but got ${token.value} instead.`);
      }
      default:
        throw new Error(`Unknown type ${token.type}`);
    }
  }
  return result;
};

const parse = text => {
  const tokens = tokenize.run(text).result;

  return structBuilder(tokens);
};

export { parse };
