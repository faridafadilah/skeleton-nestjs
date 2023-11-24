import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const fileUpload = (
  folder: string,
  fieldName: string = 'file',
  destination = './public/uploads/',
  extension: string[] = ['docs', 'pdf', 'docx', 'xls', 'xlsx'],
  maxFileSize: number = 1024 * 1024 * 5,
) => {
  return FileInterceptor(fieldName, {
    storage: diskStorage({
      destination: destination + folder,
      filename: (req, file, cb) => {
        const fileExtension = extname(file.originalname);
        const fileName = `${folder}-${Date.now()}${fileExtension}`;
        cb(null, fileName);
      },
    }),
    fileFilter: (req, file, cb) => {
      const isValidExtension = extension.some((ext) =>
        file.originalname.toLowerCase().endsWith(`.${ext}`),
      );

      if (!isValidExtension) {
        return cb(
          new Error(`Only ${extension.join(', ')} files are allowed!`),
          false,
        );
      }

      cb(null, true);
    },
    limits: {
      fileSize: maxFileSize,
    },
  });
};
