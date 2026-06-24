import { useForm } from "react-hook-form";
import storageServices from "../../appwrite/storage";
// import dbServices from "../../appwrite/database";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { Buttton, Input, RTE, Select } from "../index";
import { createPost, updatePost } from "../../store/post/postThunk";
import toast from "react-hot-toast";

function PostForm({ post }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      featuredImage: post?.featuredImage || "",
      status: post?.status || "active",
    },
  });

  // why use useCallback? => Function recreate nahi hoga every render. Performance optimization. Especially because dependency me use hua:
  const SlugTransFormation = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // remove special characters
        .replace(/\s+/g, "-") // spaces -> hyphen
        .replace(/-+/g, "-"); // // multiple hyphens -> single hyphen
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", SlugTransFormation(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, SlugTransFormation]);

  async function onSubmit(data) {
    setLoading(true);

    try {
      // aagar post hua to usko edit karna hai

      // === UPDATE FLOW ===
      if (post) {
        let file = null;

        // 1. Upload new image if provided
        if (data.featuredImage[0]) {
          file = await storageServices.fileUpload(data.featuredImage[0]);
        }

        // 2. Prepare update data
        const updateData = {
          ...data,
          featuredImage: file?.$id || post.featuredImage, // Keep old if no new
        };

        // 3. Update post using thunk
        const result = await dispatch(updatePost(post.$id, updateData));

        // 4. Handle response
        if (updatePost.fulfilled.match(result)) {
          // Delete old image if new uploaded
          if (file) {
            await storageServices.deleteFile(post.featuredImage);
          }
          toast.success("Post updated successfully! 🎉");
          navigate(`/post/${result.payload.$id}`);
        } else {
          toast.error(result.error?.message || "Update failed");
        }
      }

      // === CREATE FLOW ===
      else {
        // 1. Check if image provided
        if (!data.featuredImage[0]) {
          toast.error("Please select a featured image");
          setLoading(false);
          return;
        }

        // 2. Upload image
        const file = await storageServices.fileUpload(data.featuredImage[0]);

        // 3. Prepare post data
        const postData = {
          ...data,
          featuredImage: file.$id,
          userId: userData.$id,
        };

        // 4. Create post using thunk
        const result = await dispatch(createPost(postData));

        // 5. Handle response
        if (createPost.fulfilled.match(result)) {
          toast.success("Post created successfully! 🎉");
          navigate(`/post/${result.payload.$id}`);
        } else {
          // Delete uploaded image if post creation failed
          await storageServices.deleteFile(file.$id);
          toast.error(result.error?.message || "Creation failed");
        }
      }

      // if (post) {
      //   // new file ko phlae upload kro
      //   const file = data?.featuredImage[0]
      //     ? await storageServices.fileUpload(data?.featuredImage[0])
      //     : null;

      //   // fir file ko delete kro taki updated image hi ho after post edit
      //   if (file) {
      //     await storageServices.deleteFile(post.featuredImage);
      //   }

      //   // postdata ko update kro
      //   const updataPostData = await dbServices.updatePost(post.$id, {
      //     ...data,
      //     featuredImage: file?.$id || undefined,
      //   });

      //   if (updataPostData) {
      //     navigate(`/post/${updataPostData.$id}`);
      //   }
      // }

      // // nhi to new post create kanra hai
      // else {
      //   // data se first image extract kro
      //   console.log("dataa", data);

      //   const file = data.featuredImage[0]
      //     ? await storageServices.fileUpload(data.featuredImage[0])
      //     : null;

      //   console.log("file", file);

      //   // aagar file ho to hi post create kro
      //   if (file) {
      //     // const fileId = file.$id;
      //     // const createdPost = await dbServices.createPost({
      //     //   ...data,
      //     //   featuredImage: fileId,
      //     //   userId: userData.$id,
      //     // });

      //     const postData = {
      //       ...data,
      //       featuredImage: file.$id,
      //       userId: userData.$id,
      //     };

      //     const result = await dispatch(createPost(postData));

      //     // console.log("created Post", createdPost);
      //     // // aagar post create hua to hi redirect kro
      //     // if (createdPost) {
      //     //   navigate(`/post/${createdPost.$id}`);
      //     // }

      //     if (createPost.fulfilled.match(result)) {
      //       navigate(`/post/${result.payload.$id}`);
      //     }
      //   }
      // }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Submit error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }
  console.log("post in PostForm", post);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <div className="mb-4">
            <Input
              label={"Title :"}
              placeholder="Title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters long",
                },
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          {/* SLUG FIELD */}
          <div className="mb-4">
            <Input
              label={"Slug :"}
              placeholder="Slug"
              {...register("slug", {
                required: "Slug is required",
              })}
              readOnly
            />
            {errors.slug && (
              <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
            )}
          </div>
          <RTE
            name={"content"}
            label={"Content :"}
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-1/3 px-2">
          <div className="mb-4">
            <Input
              label={"Image :"}
              type={"file"}
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("featuredImage", {
                required: !post ? "Image is required" : false,
              })}
            />
            {errors.featuredImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.featuredImage.message}
              </p>
            )}

            {post && (
              <div className="w-full mt-4">
                <img
                  src={storageServices.filePreview(post?.featuredImage)}
                  alt={post?.title}
                  className="rounded-lg"
                />
              </div>
            )}
          </div>

          {/* STATUS FIELD */}
          <div className="mb-4">
            <Select
              label={"Status :"}
              options={["active", "inactive"]}
              {...register("status", {
                required: "Status is required",
              })}
            />
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <Buttton
            type={"submit"}
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
            disabled={loading}
          >
            {loading ? "Processing..." : post ? "Update Post" : "Create Post"}
          </Buttton>
        </div>
      </form>
    </>
  );
}

export default PostForm;
