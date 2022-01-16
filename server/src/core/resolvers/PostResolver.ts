import { Context } from 'koa';
import Container, { Service } from 'typedi';
import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  FieldResolver,
  Root,
} from 'type-graphql';
import { addFilter } from '../../common/utils/validate';
import { Relation } from '../../common/utils/graphql';
import {
  Pagination,
  FilterGroup,
  Order,
  OrderDirection,
} from '../../common/types/search';
import { EntityId } from '../types/core';
import {
  Post,
  PostFilter,
  PaginatedPosts,
  CreatePostInput,
  UpdatePostInput,
  DeletePostInput,
} from '../types/post';
import { PostService } from '../services/PostService';

/**
 * GraphQL resolver for Posts
 */
@Service()
@Resolver(() => Post)
class PostResolver {
  constructor(private readonly postService = Container.get(PostService)) {}

  // TODO: Remove this TODO once the generated implementation has been
  // reviewed according to https://github.com/TaitoUnited/full-stack-template/blob/dev/scripts/taito/DEVELOPMENT.md#code-generation
  @Authorized()
  @Query(() => PaginatedPosts, { description: 'Searches posts.' })
  async posts(
    @Ctx() ctx: Context,
    @Arg('search', () => String, {
      defaultValue: null,
    })
    search: string,
    @Arg('filterGroups', () => [FilterGroup], {
      defaultValue: [],
    })
    filterGroups: FilterGroup<PostFilter>[],
    @Arg('order', () => Order, {
      defaultValue: new Order(OrderDirection.DESC, 'createdAt'),
    })
    order: Order,
    @Arg('pagination', () => Pagination, {
      defaultValue: new Pagination(0, 20),
    })
    pagination: Pagination
  ) {
    return await this.postService.search(
      ctx.state,
      search,
      filterGroups,
      order,
      pagination
    );
  }

  // TODO: Remove this TODO once the generated implementation has been
  // reviewed according to https://github.com/TaitoUnited/full-stack-template/blob/dev/scripts/taito/DEVELOPMENT.md#code-generation
  @Authorized()
  @Query(() => Post, {
    description: 'Reads a post.',
    nullable: true,
  })
  async post(@Ctx() ctx: Context, @Arg('id', () => String) id: string) {
    return await this.postService.read(ctx.state, id);
  }

  // TODO: Remove this TODO once the generated implementation has been
  // reviewed according to https://github.com/TaitoUnited/full-stack-template/blob/dev/scripts/taito/DEVELOPMENT.md#code-generation
  @Authorized()
  @Mutation(() => Post, { description: 'Creates a new post.' })
  async createPost(@Ctx() ctx: Context, @Arg('input') input: CreatePostInput) {
    return await this.postService.create(ctx.state, input);
  }

  // TODO: Remove this TODO once the generated implementation has been
  // reviewed according to https://github.com/TaitoUnited/full-stack-template/blob/dev/scripts/taito/DEVELOPMENT.md#code-generation
  @Authorized()
  @Mutation(() => Post, { description: 'Updates a post.' })
  async updatePost(@Ctx() ctx: Context, @Arg('input') input: UpdatePostInput) {
    return await this.postService.update(ctx.state, input);
  }

  // TODO: Remove this TODO once the generated implementation has been
  // reviewed according to https://github.com/TaitoUnited/full-stack-template/blob/dev/scripts/taito/DEVELOPMENT.md#code-generation
  @Authorized()
  @Mutation(() => EntityId, { description: 'Deletes a post.' })
  async deletePost(@Ctx() ctx: Context, @Arg('input') input: DeletePostInput) {
    return await this.postService.delete(ctx.state, input);
  }

  // ------------------------------------------------------
  // Field resolvers for other entities
  // ------------------------------------------------------

  // EXAMPLE: reference to an another entity
  //
  // @Authorized()
  // @FieldResolver(() => AnotherEntity, { nullable: true })
  // @Relation<Post>('anotherEntityId')
  // async anotherEntity(@Ctx() ctx: Context, @Root() root: Post) {
  //   return root.anotherEntityId
  //     ? await this.anotherEntityService.read(ctx.state, root.anotherEntityId)
  //     : null;
  // }

  // EXAMPLE: reference to other entities
  //
  // @Authorized()
  // @FieldResolver(() => PaginatedOtherEntities)
  // async otherEntities(@Ctx() ctx: Context, @Root() root: Post) {
  //   let filterGroups: FilterGroup<AnotherEntityFilter>[] = [];
  //   filterGroups = addFilter(filterGroups, AnotherEntityFilter, 'postId', root.id);
  //
  //   return await this.otherEntityService.search(
  //     ctx.state,
  //     null,
  //     filterGroups,
  //     new Order(OrderDirection.ASC, 'createdAt'),
  //     null
  //   );
  // }
}
