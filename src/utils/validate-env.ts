import { cleanEnv, port, str, email } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
    POSTGRES_DB: str(),
  });
};

export default validateEnv;
