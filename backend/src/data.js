import crypto from "crypto";

const hashPassword = (password, salt) =>
  crypto.scryptSync(password, salt, 64).toString("hex");

const createUser = ({
  name,
  email,
  password,
  level = "iniciante",
  goal = "",
  preferredDays = "",
  preferredTimes = ""
}) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = hashPassword(password, salt);
  return {
    id: `user-${crypto.randomUUID()}`,
    name,
    email,
    passwordHash,
    passwordSalt: salt,
    level,
    goal,
    preferredDays,
    preferredTimes
  };
};

export const users = [
  createUser({
    name: "Lara Monteiro",
    email: "lara@yoga.com",
    password: "123456",
    level: "intermediario",
    goal: "Fortalecer o corpo e manter presença diária.",
    preferredDays: "Segundas e quartas",
    preferredTimes: "Manhã"
  })
];

export const privateLessonLeads = [];

export const contactMessages = [];

export const addUser = (data) => {
  const user = createUser(data);
  users.push(user);
  return user;
};

export const verifyUserPassword = (user, password) => {
  const hash = hashPassword(password, user.passwordSalt);
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(user.passwordHash, "hex"));
};
