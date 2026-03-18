module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
  customSyntax: 'postcss-html',
  rules: {
    // 允许使用未知的伪类 (为了兼容一些特殊的Vue深度选择器等)
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global'],
      },
    ],
    // 允许空源
    'no-empty-source': null,
    // 颜色值使用短格式
    'color-hex-length': 'short',
    // 限制字体大小使用相对单位，提高可访问性（如果强需求可改为警告）
    'font-weight-notation': 'numeric',
    // 强制使用 kebab-case 的类名
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected class selector to be kebab-case',
      },
    ],
    // 禁止在带有特定选择器的规则前有空行
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'after-single-line-comment'],
      },
    ],
  },
};
