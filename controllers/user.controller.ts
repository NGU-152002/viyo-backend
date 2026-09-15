import type { UserInterface } from "../Db/schema/Users.schema.ts";
import { createUser } from "../Db/Services/User.service.ts";

interface userCreateInterface {
  status: number;
  data: UserInterface | unknown;
}
export const userCreate = async (
  userData: UserInterface,
): Promise<userCreateInterface> => {
  const responseFromCreation: any = await createUser(userData);
  return {
    status: 200,
    data: responseFromCreation,
  };
};
