import { useForm } from "react-hook-form";
import storageServices from "../../appwrite/storage";
import dbServices from "../../appwrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { Buttton, Input, RTE, Select } from "../index";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        featuredImage: post?.featuredImage || "",
        status: post?.status || "",
      },
    });
  const navigate = useNavigate();

  const userData = useSelector((state) => state.userData);

  async function onSubmit(data) {
    // aagar post hua to usko edit karna hai

    if (post) {
      // new file ko phlae upload kro
      const file = data.featuredImage[0]
        ? await storageServices.fileUpload(data.featuredImage[0])
        : null;

      // fir file ko delete kro taki updated image hi ho after post edit
      if (file) {
        await storageServices.deleteFile(post.featuredImage);
      }

      // postdata ko update kro
      const updataPostData = await dbServices.updatePost(post.$id, {
        ...post,
        featuredImage: file.$id || undefined,
      });

      if (updataPostData) {
        navigate(`/post/${updataPostData.$id}`);
      }
    }

    // nhi to new post create kanra hai
    else {
      // data se first image extract kro
      console.log("dataa", data);

      const file = data.featuredImage[0]
        ? await storageServices.fileUpload(data.featuredImage[0])
        : null;

      console.log("file", file);

      // aagar file ho to hi post create kro
      if (file) {
        const fileId = file.$id;
        const createdPost = await dbServices.createPost({
          ...data,
          featuredImage: fileId,
          userId: userData.$id,
        });

        console.log("created Post", createdPost);
        // aagar post create hua to hi redirect kro
        if (createdPost) {
          navigate(`/post/${createdPost.$id}`);
        }
      }
    }
  }

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

  console.log("post in PostForm",post)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            label={"Title :"}
            placeholder="Title"
            className="mb-4"
            {...register("title", {
              required: true,
              minLength: {
                value: 2,
                message: "Title must be at least 2 characters long",
              },
            })}
          />
          <Input
            label={"Slug :"}
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", SlugTransFormation(e.target.value), {
                shouldValidate: true,
              }); // if i am remove it what will happned?
            }}
            disabled={true}
            // readOnly
          />
          <RTE
            name={"content"}
            label={"Content :"}
            control={control}
            defaultValue={post ? getValues("content") : ""}
          />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label={"Image :"}
            type={"file"}
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("featuredImage", { required: true })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={storageServices.filePreview(post?.featuredImage)}
                alt={post?.title}
                className="rounded-lg"
              />
            </div>
          )}

          <Select
            label={"Status :"}
            options={["active", "inactive"]}
            {...register("status", { required: true })}
          />
          <Buttton type={"submit"}>
            {post ? "Update Post" : "Create Post"}
          </Buttton>
        </div>
      </form>
    </>
  );
}

export default PostForm;
