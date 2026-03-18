module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 类型定义
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 (feature)
        'fix', // 修复 bug
        'docs', // 文档修改
        'style', // 代码格式修改（不影响代码运行的变动，如空格、格式化等）
        'refactor', // 代码重构（即不是新增功能，也不是修改 bug 的代码变动）
        'perf', // 优化相关（提高性能的代码变动）
        'test', // 增加测试
        'build', // 构建系统或外部依赖的变动
        'ci', // 对 CI 配置文件和脚本的更改
        'chore', // 其他修改（比如构建流程、依赖管理）
        'revert', // 代码回滚
      ],
    ],
    // subject 不能为空
    'subject-empty': [2, 'never'],
    // type 不能为空
    'type-empty': [2, 'never'],
    // subject 最大长度
    'subject-max-length': [2, 'always', 100],
  },
};
