module.exports = {
  // 可选类型
  types: [
    { value: 'feat', name: 'feat:     ✨ 新增功能 | A new feature' },
    { value: 'fix', name: 'fix:      🐛 修复缺陷 | A bug fix' },
    { value: 'docs', name: 'docs:     📝 文档更新 | Documentation only changes' },
    {
      value: 'style',
      name: 'style:    💄 代码格式 | Changes that do not affect the meaning of the code',
    },
    {
      value: 'refactor',
      name: 'refactor: ♻️  代码重构 | A code change that neither fixes a bug nor adds a feature',
    },
    { value: 'perf', name: 'perf:     ⚡️ 性能提升 | A code change that improves performance' },
    {
      value: 'test',
      name: 'test:     ✅ 测试相关 | Adding missing tests or correcting existing tests',
    },
    {
      value: 'build',
      name: 'build:    📦️ 构建相关 | Changes that affect the build system or external dependencies',
    },
    {
      value: 'ci',
      name: 'ci:       🎡 持续集成 | Changes to our CI configuration files and scripts',
    },
    {
      value: 'chore',
      name: "chore:    🔨 其他修改 | Other changes that don't modify src or test files",
    },
    { value: 'revert', name: 'revert:   ⏪️ 回退代码 | Reverts a previous commit' },
  ],
  // 消息步骤
  messages: {
    type: '请选择提交类型 (必填):',
    customScope: '请输入修改范围 (可选):',
    subject: '请简要描述提交 (必填):',
    body: '请输入详细描述 (可选):',
    breaking: '列出任何 BREAKING CHANGES (可选):',
    footer: '请输入要关闭的 issue (可选):',
    confirmCommit: '确认使用以上信息提交？(y/n)',
  },
  // 允许自定义范围
  allowCustomScopes: true,
  // 允许 breaking change 的类型
  allowBreakingChanges: ['feat', 'fix'],
  // 限制 subject 长度
  subjectLimit: 100,
};
