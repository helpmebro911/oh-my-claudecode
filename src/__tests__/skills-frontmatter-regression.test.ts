import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createBuiltinSkills, clearSkillsCache, getBuiltinSkill } from '../features/builtin-skills/skills.js';

describe('builtin skill drafting contracts for learned skills (issue #2425)', () => {
  const originalUserType = process.env.USER_TYPE;

  beforeEach(() => {
    process.env.USER_TYPE = 'ant';
    clearSkillsCache();
  });

  afterEach(() => {
    if (originalUserType === undefined) {
      delete process.env.USER_TYPE;
    } else {
      process.env.USER_TYPE = originalUserType;
    }
    clearSkillsCache();
  });

  it('learner skill instructs writing YAML frontmatter and SKILL.md paths', () => {
    const learner = getBuiltinSkill('learner');

    expect(learner).toBeDefined();
    expect(learner!.template).toContain('MUST start with YAML frontmatter');
    expect(learner!.template).toContain('Do **not** write plain markdown without frontmatter.');
    expect(learner!.template).toContain('.omc/skills/<skill-name>/SKILL.md');
    expect(learner!.template).toContain('skills/omc-learned/<skill-name>/SKILL.md');
  });

  it('skillify skill instructs drafting file-backed skills with YAML frontmatter', () => {
    const skills = createBuiltinSkills();
    const skillify = skills.find((skill) => skill.name === 'skillify');

    expect(skillify).toBeDefined();
    expect(skillify!.template).toContain('output a complete `SKILL.md` that starts with YAML frontmatter');
    expect(skillify!.template).toContain('Never emit plain markdown-only skill files.');
    expect(skillify!.template).toContain('.omc/skills/<skill-name>/SKILL.md');
    expect(skillify!.template).toContain('skills/omc-learned/<skill-name>/SKILL.md');
  });
});
