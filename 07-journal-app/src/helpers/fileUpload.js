export const fileUpload = async (file) => {
    const cloudUrl = `https://api.cloudinary.com/v1_1/dp7smorsz/upload`;
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const res = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            const cloudRes = await res.json();
            return cloudRes.secure_url;
        } else {
            throw await res.json();
        }
    } catch(e) {
        throw e;
    }
}