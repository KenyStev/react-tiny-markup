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

// utils
const log = text => {
  console.log(text);
  console.dir(tokenizeAndParse(text).result, {
    depth: null
  });
  console.log();
};

// tagger
const tokenTag = (type, customizer = id => id) => value => ({
  type,
  value: customizer(value)
});

// parser
const lAngle = char('<');
const rAngle = char('>');
const openTag = between(lAngle)(rAngle)(letters).map(tokenTag('open-tag'));
const closeTag = between(str('</'))(rAngle)(letters).map(tokenTag('close-tag'));
const text = many(anythingExcept(choice([openTag, closeTag]))).map(
  tokenTag('text', val => val.join(''))
);

// order matters
const token = choice([openTag, closeTag, text]);

const fullParser = coroutine(function* () {
  const result = [];

  while (true) {
    const value = yield token;
    if (value.value === '' || value.isError) break;
    result.push(value);
  }

  return result;
});

const structBuilder = (tokens, openTags = []) => {
  const finalResult = [];

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];

    if (t.ignore) continue;
    t.ignore = true;

    switch (t.type) {
      case 'text': {
        const { ignore, ...tag } = t;
        finalResult.push(tag);
        break;
      }
      case 'open-tag': {
        const { result, end } = structBuilder(tokens.slice(i + 1), [
          ...openTags,
          t.value
        ]);

        finalResult.push({
          type: 'tag',
          tagType: t.value,
          value: result
        });

        i += end;
        break;
      }
      case 'close-tag': {
        const lastOpen = openTags[openTags.length - 1];
        if (lastOpen === t.value) {
          return {
            result: finalResult,
            end: i + 1
          };
        }

        throw new Error(`Expected ${lastOpen} but got ${t.value} instead.`);
      }
      default:
        throw new Error(`Unknown type ${t.type}`);
    }
  }
  return { result: finalResult, end: finalResult.length + 1 };
};

const tokenizeAndParse = text => {
  const tokens = fullParser.run(text).result;

  return structBuilder(tokens);
};

export { tokenizeAndParse };

// log('abc');
// log('ab<');
// log('<a>text</no</nope... now</a>');
// log('abc<a>a</a>bc<a>de</a>');
// log('abc<a><b>tagtext</b></a>');
// log('abc<a><b>tagtext</b></a>');
// log('abc<a><b>tagtext</b></a>');
