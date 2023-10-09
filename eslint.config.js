import antfu from '@antfu/eslint-config';

export default antfu({}, {
  rules: {
    'style/semi': ['error', 'always'],
    'style/member-delimiter-style': ['error', {}],
    'antfu/top-level-function': 'off',
    'curly': ['error', 'all'],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'style/member-delimiter-style': ['error', {}],
  },
});
