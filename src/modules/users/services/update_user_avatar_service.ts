import AppError from "@shared/errors/app_error";
import path from "path";
import uploadConfig from "@config/upload";
import fs from "fs";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/users_repository";

interface IRequest {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public static async execute({ userId, avatarFileName }: IRequest) {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    //delete old avatar if it exists
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;
    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
