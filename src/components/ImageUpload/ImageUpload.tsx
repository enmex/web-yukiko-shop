import { Input, Image } from "antd";
import { useUploadPhotoMutation } from "../../app/store/photo/photo.api";

export const ImageUpload = (props: {
    setStateCallback: (id: string, photoUrl: string) => void
    photoUrl: string
}) => {
    const [uploadPhoto] = useUploadPhotoMutation();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        formData.append('image', e.target.files ? e.target.files[0] : '');
        uploadPhoto(formData).unwrap().then((res) => {
            props.setStateCallback(res.id, res.photoUrl);
        });
    };

    return (
        <>
        <Input
            type="file"
            multiple={false}
            onChange={onChange}
        />
        {props.photoUrl.length > 0 && (<><Image className="max-w-[500px] max-h-[500px]" src={props.photoUrl}/></>)}
        </>
    );
}