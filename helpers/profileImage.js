import * as FileSystem from 'expo-file-system/legacy';

const PROFILE_IMAGE_PREFIX = 'profile-image-';

const getFileExtension = ({ fileName, mimeType }) => {
    const fileNameExtension = fileName?.split('.').pop()?.toLowerCase();
    if (fileNameExtension && /^[a-z0-9]+$/.test(fileNameExtension)) return fileNameExtension;

    const mimeExtension = mimeType?.split('/').pop()?.toLowerCase();
    if (mimeExtension === 'jpeg') return 'jpg';
    if (mimeExtension && /^[a-z0-9]+$/.test(mimeExtension)) return mimeExtension;
    return 'jpg';
}

export const saveProfileImage = async (asset) => {
    if (!FileSystem.documentDirectory) throw new Error('Document directory is unavailable');

    const destination = `${FileSystem.documentDirectory}${PROFILE_IMAGE_PREFIX}${Date.now()}.${getFileExtension(asset)}`;
    await FileSystem.copyAsync({ from: asset.uri, to: destination });
    return destination;
}

export const deleteProfileImage = async (uri) => {
    if (!uri || !FileSystem.documentDirectory) return;
    if (!uri.startsWith(`${FileSystem.documentDirectory}${PROFILE_IMAGE_PREFIX}`)) return;

    await FileSystem.deleteAsync(uri, { idempotent: true });
}