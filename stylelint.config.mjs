export default {
  'extends': ['stylelint-config-hudochenkov/full', 'stylelint-config-tailwindcss'],
  'rules': {
    'media-feature-range-notation': 'context',
    'declaration-block-no-duplicate-properties': true,
    'color-hex-length': 'long',
    'selector-max-type': [0, { 'ignoreTypes': ['img', 'html', 'a', 'body', 'svg', 'picture', 'video', 'iframe', 'textarea', 'input'] }],
    'max-nesting-depth': 3,
    'selector-no-qualifying-type': [true, { 'ignore': ['attribute', 'class'] }]
  }
};
