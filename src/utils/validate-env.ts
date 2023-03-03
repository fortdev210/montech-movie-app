import { cleanEnv, port, str, email } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
    DATABASE_URL: str(),
    SHADOW_DATABASE_URL: str(),
  });
};

export default validateEnv;
