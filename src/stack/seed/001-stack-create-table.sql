create extension if not exists "uuid-ossp";
create table stacks (
    id uuid primary key default uuid_generate_v4(),
    stack_id uuid not null,
    payload varchar (50) not null,
    stack_position integer not null,
    unique (stack_id, stack_position)
);