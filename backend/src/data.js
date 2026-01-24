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

export const siteConfig = {
  assets: {
    homeHero: "/placeholders/placeholder-card.svg",
    categories: {
      "aulas-curtas": "/placeholders/placeholder-card.svg",
      iniciantes: "/placeholders/placeholder-card.svg",
      invertidas: "/placeholders/placeholder-card.svg"
    },
    plans: {
      group: "/placeholders/placeholder-card.svg",
      personal: "/placeholders/placeholder-card.svg"
    }
  },
  pricingGroup: [
    { period: "Anual", one: "R$ 120,00", two: "R$ 192,00" },
    { period: "Semestral", one: "R$ 127,00", two: "R$ 204,00" },
    { period: "Trimestral", one: "R$ 135,00", two: "R$ 216,00" },
    { period: "Mensal", one: "R$ 150,00", two: "R$ 240,00" }
  ],
  pricingPersonal: [
    { label: "Aula avulsa", value: "R$ 110,00" },
    { label: "Pacote com 4 aulas", value: "R$ 396,00" },
    { label: "Pacote com 8 aulas", value: "R$ 748,00" }
  ]
};

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

export const updateAsset = (key, image) => {
  const [section, subKey] = key.split(".");
  if (section === "homeHero") {
    siteConfig.assets.homeHero = image;
    return true;
  }
  if (section === "categories" && subKey && siteConfig.assets.categories[subKey] !== undefined) {
    siteConfig.assets.categories[subKey] = image;
    return true;
  }
  if (section === "plans" && subKey && siteConfig.assets.plans[subKey] !== undefined) {
    siteConfig.assets.plans[subKey] = image;
    return true;
  }
  return false;
};

export const updatePricing = ({ pricingGroup, pricingPersonal }) => {
  if (Array.isArray(pricingGroup)) {
    siteConfig.pricingGroup = pricingGroup;
  }
  if (Array.isArray(pricingPersonal)) {
    siteConfig.pricingPersonal = pricingPersonal;
  }
};
