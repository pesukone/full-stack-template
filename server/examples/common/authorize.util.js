import _ from 'lodash';

/**
 * USAGE: authorize(ctx).role(role).department(department);
 */
export const authorize = (ctx) => {
  const funcs = {};

  funcs.role = (...roles) => {
    if (!_.includes(roles, ctx.user.role)) {
      console.log('auth.role failed');
      const ex = {
        type: 'authorization',
        message: 'user not in role ${role}',
        ctx,
      };
      throw ex;
    }
    return funcs;
  };

  funcs.equals = (name, value1, value2) => {
    if (value1 !== value2) {
      console.log('auth.eq failed');
      const ex = {
        type: 'authorization',
        message: '${name} value mismatch: ${value1} !== ${value2}',
        ctx,
      };
      throw ex;
    }
    return funcs;
  };

  return funcs;
};
