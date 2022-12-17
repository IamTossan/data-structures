import createConnectionPool, { sql } from '@databases/pg';

const db = createConnectionPool('postgres://test-user@localhost:5432/test-db');

const getProgramById = async (id: string, version?: string) => {
  return db.query(sql`
    with nodes as (
        with recursive base as (
            select
                program_node_id,
                slug,
                name,
                content,
                jsonb_array_elements_text(content) as child_id
            from program_nodes
            where program_node_id in (select root_node_id from programs where program_id = ${id})
            union all
            select
                cur.program_node_id,
                cur.slug,
                cur.name,
                cur.content,
                jsonb_array_elements_text(cur.content) as child_id
            from program_nodes as cur
                inner join base as pre on cur.program_node_id::text = pre.child_id
        )
        select
            program_node_id,
            slug,
            name,
            content
        from base
    )
    select distinct *
    from nodes
    ;
  `);
};

const updateProgramNode = async () => {};

async function run() {
  const results = await getProgramById('63f33221-8424-48a2-958f-946b94e93277');

  console.log(results);
  // => [{result: 2}]

  await db.dispose();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
