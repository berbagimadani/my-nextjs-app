import { GetServerSidePropsContext } from 'next';

export function getToken(ctx: GetServerSidePropsContext) {
  const { token } = ctx.req.cookies;
  return token || null;
}
