import SubmitButton from "../SubmitButton";

export default function CertificateForm({ register, handleSubmit, errors, setValue, onSubmit, isPending }) {
    return (
        <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col bg-amber-50">
                <label
                    htmlFor="certificate-title-upload"
                    className="block mb-2"
                >
                    Certificate Title
                </label>
                <input
                    className=""
                    {...register("title")}
                />
                {errors.title && <span>{errors.title.message}</span>}
            </div>

            <div className="flex flex-col bg-amber-10">
                <label
                    htmlFor="certificate-description-upload"
                    className="block mb-2"
                >
                    Certificate Description
                </label>
                <textarea
                    className="bg-white"
                    {...register("description")}
                />
                {errors.description && <span>{errors.description.message}</span>}
            </div>

            <div className="flex flex-col bg-amber-200">
                <label
                    htmlFor="certificate-image-upload"
                    className="block mb-2"
                >
                    Upload Certificate Image
                </label>
                <input
                    type="file"
                    onChange={(e) => {
                        const files = e.target.files;
                        if (files) setValue("image", files, { shouldValidate: true });
                    }}
                />
                {errors.image && <span>{errors.image.message}</span>}
            </div>

            <SubmitButton
                text="Upload"
                onClick={handleSubmit(onSubmit)}
                disabled={isPending}
                loading={isPending}
                className="bg-amber-400"
            />
        </form>
    );
}
