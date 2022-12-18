import { describe, it, expect } from '@jest/globals';

import { NodeType, Program } from '.';

describe('PersistentTree', () => {
  describe('Program', () => {
    it('should create a Program', () => {
      const program = new Program();

      expect(program).toBeInstanceOf(Program);
    });

    it('should add a Discipline', () => {
      const program = new Program();
      expect(
        program.listNodes({ filterByType: NodeType.DISCIPLINE }),
      ).toHaveLength(0);

      const updatedProgram = program.addNode({
        type: NodeType.DISCIPLINE,
        name: 'Computer science',
        slug: 'computer_science',
      });

      expect(updatedProgram).not.toEqual(program);

      expect(
        updatedProgram.listNodes({
          rootId: updatedProgram.roots[updatedProgram.roots.length - 2],
        }),
      ).toEqual([
        {
          id: expect.any(String),
          type: NodeType.ROOT,
          name: 'program',
          slug: 'program',
          content: [],
        },
      ]);

      expect(updatedProgram.listNodes()).toEqual([
        {
          id: expect.any(String),
          type: NodeType.ROOT,
          name: 'program',
          slug: 'program',
          content: [expect.any(String)],
        },
        {
          id: expect.any(String),
          type: NodeType.DISCIPLINE,
          name: 'Computer science',
          slug: 'computer_science',
          content: [],
        },
      ]);
    });

    it('should add a Course', () => {
      const program = new Program({
        nodes: {
          '0': {
            id: '0',
            type: NodeType.ROOT,
            name: 'program',
            slug: 'program',
            content: ['1'],
          },
          '1': {
            id: '1',
            type: NodeType.DISCIPLINE,
            name: 'Computer science',
            slug: 'computer_science',
            content: [],
          },
        },
        roots: ['0'],
      });

      const updatedProgram = program.addNode(
        {
          type: NodeType.COURSE,
          name: 'Data structures',
          slug: 'data_structures',
        },
        '1',
      );

      expect(program).not.toEqual(updatedProgram);
      expect(updatedProgram.listNodes()).toEqual([
        {
          id: expect.any(String),
          type: NodeType.ROOT,
          name: 'program',
          slug: 'program',
          content: [expect.any(String)],
        },
        {
          id: expect.any(String),
          type: NodeType.DISCIPLINE,
          name: 'Computer science',
          slug: 'computer_science',
          content: [expect.any(String)],
        },
        {
          id: expect.any(String),
          type: NodeType.COURSE,
          name: 'Data structures',
          slug: 'data_structures',
          content: [],
        },
      ]);
    });

    it('should add a Teacher', () => {
      const program = new Program({
        nodes: {
          '0': {
            id: '0',
            type: NodeType.ROOT,
            name: 'program',
            slug: 'program',
            content: ['1'],
          },
          '1': {
            id: '1',
            type: NodeType.DISCIPLINE,
            name: 'Computer science',
            slug: 'computer_science',
            content: ['2'],
          },
          '2': {
            id: '2',
            type: NodeType.COURSE,
            name: 'Data structures',
            slug: 'data_structures',
            content: [],
          },
        },
        roots: ['0'],
      });

      const updatedProgram = program.addNode(
        {
          type: NodeType.TEACHER,
          name: 'Alan Kay',
          slug: 'alan_kay',
        },
        '2',
      );

      expect(program).not.toEqual(updatedProgram);
      expect(updatedProgram.listNodes()).toEqual([
        {
          id: expect.any(String),
          type: NodeType.ROOT,
          name: 'program',
          slug: 'program',
          content: [expect.any(String)],
        },
        {
          id: expect.any(String),
          type: NodeType.DISCIPLINE,
          name: 'Computer science',
          slug: 'computer_science',
          content: [expect.any(String)],
        },
        {
          id: expect.any(String),
          type: NodeType.COURSE,
          name: 'Data structures',
          slug: 'data_structures',
          content: [expect.any(String)],
        },
        {
          id: expect.any(String),
          type: NodeType.TEACHER,
          name: 'Alan Kay',
          slug: 'alan_kay',
          content: [],
        },
      ]);
    });
  });
});
