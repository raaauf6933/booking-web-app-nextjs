import CredentialsProvider from 'next-auth/providers/credentials';

export const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Enter your username',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      async authorize(credentials) {
        const user = { id: '32', name: 'dave', password: 'next auth' };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        )
          return true;

        return false;
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
};
