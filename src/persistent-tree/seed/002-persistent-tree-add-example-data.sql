insert into program_nodes (program_node_id, name, slug, type, content)
values (
        '65054a99-7daf-42ba-ae94-490d039c567c',
        'my program',
        'program-01',
        'ROOT',
        '["", "d8af9f5d-f0ba-420e-88cb-c266712a0cb4", "a53dfa97-a433-4315-b612-7e36b5fe402f"]'::jsonb
    ),
    (
        'd8af9f5d-f0ba-420e-88cb-c266712a0cb4',
        'Computer Science',
        'discipline-01',
        'DISCIPLINE',
        '["", "a02d5a50-0d5f-4494-bcbc-e47f02b62747", "626693b5-e82e-4af7-aa6a-f43776611410"]'::jsonb
    ),
    (
        'a53dfa97-a433-4315-b612-7e36b5fe402f',
        'Mathematics',
        'discipline-02',
        'DISCIPLINE',
        '[""]'::jsonb
    ),
    (
        'a02d5a50-0d5f-4494-bcbc-e47f02b62747',
        'Alan Kay',
        'teacher-01',
        'TEACHER',
        '[""]'::jsonb
    ),
    (
        '626693b5-e82e-4af7-aa6a-f43776611410',
        'Linus Torvald',
        'teacher-02',
        'TEACHER',
        '[""]'::jsonb
    );
insert into programs (
        program_id,
        slug,
        name,
        version,
        root_node_id
    )
values (
        '63f33221-8424-48a2-958f-946b94e93277',
        'my-program',
        'My program',
        'v1',
        '65054a99-7daf-42ba-ae94-490d039c567c'
    );