create extension if not exists "uuid-ossp";
create table programs (
    program_id uuid primary key default uuid_generate_v4(),
    slug varchar (50) not null,
    name varchar (50) not null,
    version varchar (50) not null,
    root_node_id uuid not null
);
create table program_nodes (
    program_node_id uuid primary key default uuid_generate_v4(),
    slug varchar (50) not null,
    name varchar (50) not null,
    type varchar (50) not null,
    content jsonb
);