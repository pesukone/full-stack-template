import { initGraphQL, setUser } from '../common/test.utils';
// TEMPLATE_GENERATE: Imports

const { api, sdk } = initGraphQL();

beforeAll(async () => {
  await setUser(api);
});

describe('entityName queries', () => {
  it('query "entityNames" returns some entityNames', async () => {
    const { entityNames } = await sdk.entityNames({
      pagination: { offset: 0, limit: 10 },
    });
    expect(entityNames.data.length).toBeGreaterThan(0);

    const id = entityNames.data[0].id;
    const { entityName } = await sdk.entityName({
      id,
    });
    expect(entityName?.id).toEqual(id);
  });
});

let id = '';
const entityNameValues = {
  // TEMPLATE_GENERATE: Entity field values
};

const createEntityNameParams = {
  ...entityNameValues,
  // TEMPLATE_GENERATE: Entity reference id values
};

describe('entityName mutations', () => {
  beforeEach(async () => {
    const createResponse = await sdk.createEntityName({
      input: createEntityNameParams,
    });
    id = createResponse.createEntityName.id;
  });

  afterEach(async () => {
    if (id) {
      await sdk.deleteEntityName({
        input: { id },
      });
    }
  });

  it('mutation "create" works ok', async () => {
    const { entityName } = await sdk.entityName({
      id,
    });
    expect(entityName).toMatchObject(entityNameValues);
  });

  it('mutation "update" works ok', async () => {
    const updateEntityNameParams = {
      id,
      // TEMPLATE_GENERATE: Entity field updated values
    };

    await sdk.updateEntityName({
      input: updateEntityNameParams,
    });
    const { entityName } = await sdk.entityName({
      id,
    });

    expect(entityName).toMatchObject(updateEntityNameParams);
  });

  it('mutations "delete" works ok', async () => {
    const { deleteEntityName } = await sdk.deleteEntityName({
      input: { id },
    });
    expect(deleteEntityName.id).toEqual(id);

    const { entityName } = await sdk.entityName({
      id,
    });
    expect(entityName).toBeNull();
    id = '';
  });
});