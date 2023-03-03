import { cleanEnv, port, str, email } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
    DB_HOST: str(),
    DB_PORT: port(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
  });
};

export default validateEnv;
