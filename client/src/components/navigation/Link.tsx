import { forwardRef, useMemo, ReactNode } from 'react';
import { FocusRing, mergeProps } from 'react-aria';
import styled, { css } from 'styled-components';

import {
  NavLink as RRNavLink,
  Link as RRLink,
  LinkProps,
  matchPath,
} from 'react-router-dom';

import {
  LoaderParams,
  RouteEntries,
  parseEntrySearchParams,
  useRouteEntries,
} from '../../routes/route-utils';

import { useStaleReload } from '../../utils/routing';

type PreloadTrigger = 'hover' | 'click' | 'focus';

type Props = LinkProps & {
  children: ReactNode;
  preloadOn?: PreloadTrigger;
};

export const Link = forwardRef<any, Props>(
  ({ children, to, preloadOn, ...props }, ref: any) => {
    const p = useLinkProps({ to, preloadOn });

    return (
      <FocusRing focusRingClass="link-focus">
        <LinkWrapper {...mergeProps(props, p)} to={to} ref={ref}>
          {children}
        </LinkWrapper>
      </FocusRing>
    );
  }
);

Link.displayName = 'Link';

export const UnstyledLink = forwardRef<any, Props>(
  ({ children, to, preloadOn, ...props }, ref: any) => {
    const p = useLinkProps({ to, preloadOn });

    return (
      <UnstyledLinkWrapper {...mergeProps(props, p)} to={to} ref={ref}>
        {children}
      </UnstyledLinkWrapper>
    );
  }
);

UnstyledLink.displayName = 'UnstyledLink';

// Nav link knows whether it is active or not based on the current url
export const NavLink = forwardRef<any, Props>(
  ({ children, to, preloadOn, ...props }, ref: any) => {
    const p = useLinkProps({ to, preloadOn });

    return (
      <FocusRing focusRingClass="link-focus">
        <NavLinkWrapper {...mergeProps(props, p)} to={to} ref={ref}>
          {children}
        </NavLinkWrapper>
      </FocusRing>
    );
  }
);

NavLink.displayName = 'NavLink';

export function useLinkProps({
  to,
  preloadOn = 'click',
}: {
  to: Props['to'];
  preloadOn?: PreloadTrigger;
}) {
  const isStale = useStaleReload();
  const routes = useRouteEntries();

  function handleStaleNavigation() {
    // Auto-reload the app if enough time has passed from last navigation
    if (isStale) setTimeout(() => window.location.reload(), 100);
  }

  // Preload route code for faster page load experience
  async function handlePreload() {
    const [toPath, toSearchParams] = to.toString().split('?');

    const match = (path: string) => {
      // Remove search params

      // Absolute links
      if (to.toString().startsWith('/')) {
        return matchPath(path, toPath);
      }

      // Relative links
      return matchPath(path, `${location.pathname}/${toPath}`);
    };

    const route = flattenRoutes(routes).find(r => match(r.path));

    if (route?.entry && route.entry.load) {
      try {
        const params = match(route.path)?.params || {};

        const loaderParams = {
          ...params,
          searchParams: parseEntrySearchParams({
            searchParams: new URLSearchParams(toSearchParams),
            searchParamsOptions: route.entry.searchParamsOptions,
          }),
        } as LoaderParams<string>;

        console.log('> Preloading route', route.path, loaderParams);

        await route.entry.load(loaderParams);
      } catch (error) {
        console.log('> Failed to preload route', error);
      }
    }
  }

  return useMemo(() => {
    const props: any = { onClick: handleStaleNavigation };

    if (preloadOn === 'click') {
      props.onMouseDown = handlePreload;
    } else if (preloadOn === 'hover') {
      props.onMouseEnter = handlePreload;
    } else if (preloadOn === 'focus') {
      props.onFocus = handlePreload;
    }

    return props;
  }, [to, preloadOn, isStale]); // eslint-disable-line react-hooks/exhaustive-deps
}

// Flatten the route tree into a list of routes so that we can match the current
// url to a route and preload it
function flattenRoutes(routes: RouteEntries) {
  const flattened: RouteEntries = [];

  routes.forEach(r => {
    flattened.push(r);

    const nested = flattenRoutes(r.children || []).map(n => ({
      ...n,
      path: `${r.path}/${n.path}`,
    }));

    flattened.push(...nested);
  });

  return flattened;
}

const linkStyles = css`
  text-decoration: none;
  outline: none;

  &.link-focus {
    text-decoration: underline;
    text-decoration-color: ${p => p.theme.colors.primary};
    text-decoration-skip-ink: auto;
    text-decoration-thickness: 2px;
  }
`;

const UnstyledLinkWrapper = styled(RRLink)`
  text-decoration: none;
  outline: none;
`;

const LinkWrapper = styled(RRLink)`
  ${linkStyles}
`;

const NavLinkWrapper = styled(RRNavLink)`
  ${linkStyles}
`;
