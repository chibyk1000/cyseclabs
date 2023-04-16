import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import path from 'path'
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void



export const fileStorage = multer.diskStorage({
    destination: (
        request: Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
       callback(null, path.join(__dirname, '../cyseclabsuploads'))
    },

    filename: (
        req: Request, 
        file: Express.Multer.File, 
        callback: FileNameCallback
    ): void => {
        

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const _ = file.originalname.split('.')

        const ext = _[_.length -1]
    callback(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)

      
    }
})

export const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}
export const uploadFileFilter= multer({storage:fileStorage})

const upload  = multer({ storage: fileStorage, fileFilter: fileFilter,  })
  
export default upload