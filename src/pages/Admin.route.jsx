import Admin from '@/pages/Admin'

export default {
  path: 'admin',
  Component: Admin,
  layout: 'bare',
  auth: { role: 'admin' },
}
