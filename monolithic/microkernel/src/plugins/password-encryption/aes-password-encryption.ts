import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from 'crypto';
import { PasswordEncryptionPlugin } from './password-encryption.interface';
import { Task } from 'src/core/domain/entities/task.entity';
import { IPlugin } from '../plugin.interface';
import { PluginsTypes } from '../plugins-types';

class DecryptionFailedError extends Error {
  constructor() {
    super('Failed to decrypt data: invalid password or corrupted data');
    this.name = 'DecryptionFailedError';
  }
}

export class AESPasswordEncryptionPlugin
  implements PasswordEncryptionPlugin, IPlugin
{
  public readonly type = PluginsTypes.PasswordEncryption;
  private readonly algorithm = 'aes-256-cbc';
  private readonly keyLength = 32; // 256 bits

  private readonly fieldsToEncrypt = ['title', 'description'];

  encrypt(task: Task, password: string): Task {
    try {
      const encryptedTask = { ...task };

      for (const field of this.fieldsToEncrypt) {
        if (encryptedTask[field]) {
          encryptedTask[field] = this.encryptField(
            encryptedTask[field],
            password,
          );
        }
      }

      return encryptedTask;
    } catch {
      throw new DecryptionFailedError();
    }
  }

  decrypt(encryptedTask: Task, password: string): Task {
    const decryptedTask = { ...encryptedTask };

    for (const field of this.fieldsToEncrypt) {
      if (decryptedTask[field]) {
        decryptedTask[field] = this.decryptField(
          decryptedTask[field],
          password,
        );
      }
    }

    return decryptedTask;
  }

  private encryptField(data: string, password: string): string {
    const salt = randomBytes(16);
    const key = scryptSync(password, salt, this.keyLength);
    const iv = randomBytes(16);

    const cipher = createCipheriv(this.algorithm, key, iv);
    const encrypted = Buffer.concat([
      cipher.update(data, 'utf8'),
      cipher.final(),
    ]);

    return `${salt.toString('hex')}:${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  private decryptField(encryptedData: string, password: string): string {
    const [saltHex, ivHex, encryptedHex] = encryptedData.split(':');
    const salt = Buffer.from(saltHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');

    const key = scryptSync(password, salt, this.keyLength);
    const decipher = createDecipheriv(this.algorithm, key, iv);
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return decrypted.toString('utf8');
  }
}
