import createConnectionPool, { sql } from '@databases/pg';

const db = createConnectionPool('postgres://test-user@localhost:5432/test-db');

const getStackById = async (stack_id: string) => {
  return db.query(sql`
    select
      stack_position,
      payload
    from stacks
    where stack_id = ${stack_id}
    order by stack_position
    ;
  `);
};

const push = async (stack_id: string, cursor: number, payload: string) => {
  return db.query(sql`
    insert into stacks (stack_id, stack_position, payload)
    values (
      ${stack_id},
      ${cursor + 1},
      ${payload}
    )
    ;
  `);
};

async function run() {
  const initialStack = await getStackById(
    '4fd671a8-91e8-49ca-803b-3bde468455bc',
  );
  console.log(initialStack);

  await push('4fd671a8-91e8-49ca-803b-3bde468455bc', 5, '!');
  console.log('pushing "!"');

  const updatedStack = await getStackById(
    '4fd671a8-91e8-49ca-803b-3bde468455bc',
  );
  console.log(updatedStack);

  await db.dispose();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
