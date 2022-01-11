import { initGraphQL, setUser } from '../common/test.utils';

const { api, sdk } = initGraphQL();

beforeAll(async () => {
  await setUser(api);
});

describe('post queries', () => {
  it('query "posts" returns some posts', async () => {
    const { posts } = await sdk.posts({
      pagination: { offset: 0, limit: 10 },
    });
    expect(posts.data.length).toBeGreaterThan(0);

    const id = posts.data[0].id;
    const { post } = await sdk.post({
      id,
    });
    expect(post?.id).toEqual(id);
  });
});

let id = '';
const postValues = {
  subject: 'subject',
  content: 'content',
  author: 'author',
};

const createPostParams = {
  ...postValues,
};

describe('post mutations', () => {
  beforeEach(async () => {
    const createResponse = await sdk.createPost({
      input: createPostParams,
    });
    id = createResponse.createPost.id;
  });

  afterEach(async () => {
    if (id) {
      await sdk.deletePost({
        input: { id },
      });
    }
  });

  it('mutation "create" works ok', async () => {
    const { post } = await sdk.post({
      id,
    });
    expect(post).toMatchObject(postValues);
  });

  it('mutation "update" works ok', async () => {
    const updatePostParams = {
      id,
      subject: 'subject2',
      content: 'content2',
      author: 'author2',
    };

    await sdk.updatePost({
      input: updatePostParams,
    });
    const { post } = await sdk.post({
      id,
    });

    expect(post).toMatchObject(updatePostParams);
  });

  it('mutations "delete" works ok', async () => {
    const { deletePost } = await sdk.deletePost({
      input: { id },
    });
    expect(deletePost.id).toEqual(id);

    const { post } = await sdk.post({
      id,
    });
    expect(post).toBeNull();
    id = '';
  });
});
