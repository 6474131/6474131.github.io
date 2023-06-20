export class User {
  static postConverter = {
    toFirestore(user) {
      return {
        userId: user.userId,
        email:  user.email,
      };
    },
    fromFirestore(
      snapshot,
      options,
    ) {
      const data = snapshot.data(options);
      return new User(data.userId, data.email);
    },
  };
  userId;
  email;

  constructor(userId, email) {
    this.userId = userId;
    this.email  = email;
  }
}
