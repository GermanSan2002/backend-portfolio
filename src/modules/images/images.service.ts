import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { storage } from 'src/firebase/firebase.config';
import { v4 as uuidv4 } from 'uuid';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
@Injectable()
export class ImagesService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuidv4()}-${file.originalname}`;
    const storageRef = ref(storage, `images/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file.buffer);
    return await getDownloadURL(snapshot.ref);
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const fileRef = ref(storage, fileUrl);
      console.log(JSON.stringify(fileRef, null, 2));
      deleteObject(fileRef)
        .then(() => {
          console.log('la imagen se elimino');
        })
        .catch((error) => {
          console.log('ocurrio un error: ', error);
        });
    } catch (error) {
      console.error('Error deleting file from Firebase:', error);
      throw new InternalServerErrorException('Failed to delete file');
    }
  }
}
