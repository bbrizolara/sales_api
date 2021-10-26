import AppError from "@shared/errors/app_error";
import path from "path";
import uploadConfig from "@config/upload";
import fs from "fs";
import { IUpdateUserAvatar } from "../domain/models/iUpdateUserAvatar";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/iUsersRepository";

@injectable()
class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject("UserRepository")
    usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ id, avatarFileName }: IUpdateUserAvatar) {
    const user = await this.usersRepository.findById(id);
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
    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
