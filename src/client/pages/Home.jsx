import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { apiUtils } from "../utils/api";
import { queryClient } from "../utils/utils";
import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";

const Home = () => {
  const imgRef = React.useRef(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [images, setImages] = useState([]);
  const { data } = useQuery("images", () =>
    apiUtils.get("/images").then((res) => {
      setImages(res);
      return res;
    })
  );

  const mutation = useMutation(
    ["images"],
    (image) => {
      console.log(image);
      return apiUtils.post("/add-image", image);
    },
    {
      onSuccess: () => {
        console.log("Image added successfully");
        queryClient.invalidateQueries("images");
      },
      onError: (error) => console.log(error),
    }
  );

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    mutation.mutate(data);
    e.target.reset();
    setShowUploadForm(false);
  };

  const [gridItems, setGridItems] = useState([]);

  useEffect(() => {
    // Create an array to store the dimensions of each image
    const imageDimensions = [];

    // Load all images and get their dimensions
    const loadImageDimensions = async () => {
      const promises = images.map(async (image, index) => {
        const imgElement = document.createElement("img");
        imgElement.src = image.url;

        await imgElement.decode();

        const width = imgElement.naturalWidth;
        const height = imgElement.naturalHeight;

        imageDimensions[index] = { width, height };
      });

      await Promise.all(promises);

      // Calculate row and column spans based on image dimensions
      const gridItemsData = imageDimensions.map((dimension, index) => {
        console.log(dimension);
        const colSpan = dimension.width > dimension.height ? 2 : 1;
        const rowSpan = dimension.height > dimension.width ? 2 : 1;
        console.log(colSpan, rowSpan);
        return {
          ...images[index],
          colSpan,
          rowSpan,
        };
      });

      setGridItems(gridItemsData);
    };

    loadImageDimensions();
  }, [images]);

  return (
    <>
      <Navbar clickFn={() => setShowUploadForm(true)} />
      <main className="px-28 py-8">
        {showUploadForm && (
          <div
            onClick={() => setShowUploadForm(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blend-multiply h-full w-full z-10 flex flex-col items-center justify-center bg-[#00000040] bg-opacity-50"
          >
            <UploadForm
              cancelFn={() => setShowUploadForm(false)}
              onSubmit={onSubmit}
            />
          </div>
        )}
        <div className="gap-4 mt-8 grid-flow-dense sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
          {gridItems &&
            gridItems.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className={`rounded-xl relative cursor-pointer hover:opacity-80 max-h-fit
              transition duration-300 ease-in-out mb-4`}
                >
                  <img
                    src={item.url}
                    alt={item.label}
                    className="rounded-xl image w-full h-auto inline-block "
                  />
                  <div className="px-4 py-4 absolute bottom-0 content">
                    <h1 className="text-xl text-white font-medium w-full">
                      {item.label}
                    </h1>
                  </div>
                  <div className="absolute top-2 right-2 content">
                    <span
                      className="text-xs text-[#EB5757] rounded-xl px-4 py-1 border-[#EB5757] border font-medium w-full delete"
                      onClick={() => {
                        apiUtils
                          .delete(`/images/${item.id}`)
                          .then((res) => {
                            console.log(res);
                            queryClient.invalidateQueries("images");
                          });
                      }}
                    >
                      delete
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </>
    // <div>
    //   React App Home
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Sr. No.</th>
    //         <th>Name</th>
    //         <th>Email</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {users.map((user, index) => (
    //         <tr key={user.id}>
    //           <td>{index + 1}</td>
    //           <td>{user.name}</td>
    //           <td>{user.email}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   <Form onSubmit={onSubmit} />
    // </div>
  );
};

export default Home;
