import {
  InitiateAuthCommand,
  type AuthenticationResultType,
} from "@aws-sdk/client-cognito-identity-provider";
import { congintoClient } from "../server.js";
import {
  generateJWTTokenForUser,
  generateSecretHash,
  jwtDecode,
} from "../utils/aws.utils.ts";
import jwt from "jsonwebtoken";
import { fastify } from "../server.js";
interface AuthLoginValidateInterface {
  username: string;
  password: string;
}

interface AuthLoginValidateResponse {
  status: boolean;
  message: string;
  accessToken?: string;
}

type authJWtEligibilityType =
  | {
      status: true;
      message: string;
      idToken: string;
    }
  | {
      status: false;
      message: string;
      idToken: undefined;
    };

const authJWtEligibility = async (
  authResult: AuthenticationResultType | undefined,

): Promise<authJWtEligibilityType> => {
  if (!authResult) {

    return {
      status: false,
      message: "Auth challenge requried",
      idToken: undefined,
    };
  }

  if (!authResult.IdToken) {
    return {
      status: false,
      message: "Something went wrong.",
      idToken: undefined,
    };
  }

  return { status: true, message: "", idToken: authResult.IdToken };
};

export const AuthLoginValidate = async ({
  username,
  password,
}: AuthLoginValidateInterface): Promise<AuthLoginValidateResponse> => {
  try {
    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: process.env.CONGNITO_CLIENT_ID,

      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: generateSecretHash(username),
      },
    });

    const responseFromCognito = await congintoClient.send(command);

    // get auth result
    const authResult = responseFromCognito.AuthenticationResult;

    // checks first authResult and idtoken
    const responseFromEligibility = await authJWtEligibility(
      authResult
    );

    if (!responseFromEligibility.status) return responseFromEligibility;

    const idToken = responseFromEligibility.idToken;
    const getUserSubId = jwtDecode(idToken) as { sub: string };
    const accessToken = generateJWTTokenForUser(getUserSubId.sub);

    return {
      status: true,
      message: "Valid credentials",
      accessToken,
    };
  } catch (Err) {
    fastify.log.error(Err);
    return {
      status: false,
      message: "Invalid Credentials",
    };
  }
};
