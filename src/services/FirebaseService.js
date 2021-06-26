import { storage } from '../firebase';

const FirebaseService = {
    upload: async (path, data, metadata) => {
        const storageRef = storage.ref();

        // upload image and get url
        let url = await storageRef.child(path).put(data.file, metadata).then((snapshot) => {
            return snapshot.ref.getDownloadURL();
        });

        return await url;
    },
    remove: async (path) => {
        const storageRef = await storage.ref();
        storageRef
            .child(path)
            .delete()
            .then(() => {
                console.log('Deletion was successful');
            })
            .catch((error) => {
                console.log('Error while deletion has occurred', error);
            });
    },
}

export default FirebaseService;
