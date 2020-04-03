import * as request from 'supertest';
export async function getAdminToken(server: any) {
  const res = await request(server)
    .post('/auth/login')
    .send({ username: 'admin', password: '123' });
  const token = res.body.access_token;
  return token;
}
