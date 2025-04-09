import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotAuthorizedError, NotFoundError } from "../errors";
import { VerifyCallback, Profile } from "passport-google-oauth20";
import {
  IBlacklistRepository,
  IUserRepository,
  TYPES,
  UserPayload,
} from "../types";
import { container } from "../../inversify.config";
import { Password, Tokens } from "../utils";
import jwt from "jsonwebtoken";
import { env } from "../config";

export const signup = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  const userRepository = container.get<IUserRepository>(TYPES.IUserRepository);
  const existingUser = await userRepository.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email is already in use");
  }
  const user = await userRepository.create({
    email,
    password: await Password.toHash(password),
  });
  req.currentUser = {
    id: user.id,
    email: user.email,
    is2FAEnabled: user.is2FAEnabled,
    is2FAVerified: false,
    isOauth2User: false,
  };
  next();
};

export const signin = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  const userRepository = container.get<IUserRepository>(TYPES.IUserRepository);
  const user = await userRepository.findOne({ email });
  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }
  const passwordsMatch = await Password.compare(user.password, password);
  if (!passwordsMatch) {
    throw new BadRequestError("Invalid Credentials");
  }
  const currentUser = {
    id: user.id,
    email: user.email,
    is2FAEnabled: user.is2FAEnabled,
    is2FAVerified: false,
    isOauth2User: false,
  };
  if (user.is2FAEnabled) {
    const { temp2FAToken } = Tokens.generateTemp2FAToken(currentUser);
    res.status(200).send({ accessToken: temp2FAToken });
    return;
  }
  req.currentUser = currentUser;
  next();
};

export const signout = async function (req: Request, res: Response) {
  const refreshToken = req.cookies?.refreshToken;
  const blacklistRepository = container.get<IBlacklistRepository>(
    TYPES.IBlacklistRepository
  );
  await blacklistRepository.create({ token: refreshToken });
  res.clearCookie("refreshToken");
  res.status(205).send();
};

export const refreshToken = async function (req: Request, res: Response) {
  const refreshToken = req.cookies?.refreshToken;
  let currentUser: UserPayload;
  try {
    currentUser = jwt.verify(refreshToken, env.REFRESH_JWT_KEY) as UserPayload;
  } catch {
    res.clearCookie("refreshToken");
    throw new NotAuthorizedError();
  }
  const userRepository = container.get<IUserRepository>(TYPES.IUserRepository);
  const user = await userRepository.findOne({ id: currentUser.id });
  if (!user) {
    throw new NotFoundError();
  }
  const payload = {
    id: user.id,
    email: user.email,
    is2FAEnabled: currentUser.is2FAEnabled,
    is2FAVerified: currentUser.is2FAVerified,
    isOauth2User: currentUser.isOauth2User,
  };
  const { accessToken } = Tokens.generateAccessToken(payload);
  return res.status(200).send({ accessToken });
};

export const googleCallback = async function (
  _accessToken,
  _refreshToken,
  profile: Profile,
  done: VerifyCallback
) {
  try {
    const email = profile.emails?.[0].value;
    const googleId = profile.id;
    const userRepository = container.get<IUserRepository>(
      TYPES.IUserRepository
    );
    const existingUser = await userRepository.findOne({ email });
    if (existingUser) {
      return done(null, { id: existingUser.id, email: existingUser.email });
    }
    const user = await userRepository.create({ email, googleId: googleId });
    return done(null, { id: user.id, email: user.email });
  } catch (error) {
    return done(error);
  }
};

export const googleRedirect = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const payload = {
    ...req.user,
    is2FAEnabled: false,
    is2FAVerified: false,
    isOauth2User: true,
  } as UserPayload;
  const { refreshToken } = Tokens.generateRefreshToken(payload);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV !== "test",
  });
  res.redirect(`${env.CLIENT_URL}/`);
};
