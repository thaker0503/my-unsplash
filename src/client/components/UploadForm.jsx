import React from "react";
import { useForm } from "react-hook-form";

const UploadForm = ({ cancelFn, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //   const onSubmit = (data, e) => {
  //     console.log(data);
  //     // mutation.mutate(data);
  //     e.target.reset();
  //   };

  return (
    <div
      className="bg-white w-[30vw] h-[30vh] min-h-[380px] rounded-xl flex flex-col items-stretch justify-around py-6 px-8 shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="text-2xl text-[#333] font-medium">Add a new photo</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-stretch justify-around flex-1"
      >
        <label
          htmlFor="label"
          className="text-[#4F4F4F] font-medium text-sm pt-2"
        >
          Label
        </label>
        <input
          type="text"
          name="label"
          id="label"
          {...register("label", { required: true })}
          className="custom-shadow border-[#4F4F4F] border rounded-xl placeholder:text-[#BDBDBD] text-bold font-medium focus:outline-none px-4 py-2 text-sm"
          placeholder="A cool photo"
        />
        <label
          htmlFor="url"
          className="text-[#4F4F4F] mt-2 font-medium text-sm"
        >
          Photo URL
        </label>
        <input
          type="text"
          name="url"
          id="url"
          {...register("url", { required: true })}
          className="custom-shadow border-[#4F4F4F] border rounded-xl placeholder:text-[#BDBDBD] text-bold font-medium focus:outline-none px-4 py-2 text-sm"
          placeholder="https://unsplash.com/photos/..."
        />
        <div className="flex items-center justify-end mt-2">
          <input
            type="reset"
            value="Cancel"
            onClick={cancelFn}
            className="filter:drop-shadow(0px 4px 10px rgba(61, 180, 109, 0.2)); bg-white py-3 px-4 text-[#BDBDBD] rounded-xl font-bold text-base cursor-pointer"
          />
          <input
            type="submit"
            className="filter:drop-shadow(0px 4px 10px rgba(61, 180, 109, 0.2)); bg-[#3DB46D] py-3 px-4 text-white rounded-xl font-bold text-base cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
