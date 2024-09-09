import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button.jsx";
import Input from '../Input';
import Select from '../Select';

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import postServices from "../../appwrite/PostData";

export default function PostForm({post}) {
   
    const { register, handleSubmit, setValue} = useForm({
        defaultValues: {
            title:"",
            slug: "",
            content: "",
            status:"active",
            
        },
    });
    
    useEffect(() => {
        if (post) {
            setValue("title", post.title);
            setValue("slug", post.$id);
            setValue("content", post.content);
            
            setValue("status", post.status);
            post.featuredImage;
        }
    }, [post, setValue]);
    
// console.log(post)
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
// console.log(userData)
    const submit = async (data) => 
        { 
            if(!post)
             {
        const file = await postServices.uploadFile(data.image[0]);
            if (file) {
                console.log("File Uploaded Successfully");
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await postServices.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    console.log("Post created Successfully");
                    navigate(`/`);
                }
            }
            }
            else {
                console.log("working")
                    // Edit Post Content will be here
        const file = data.image[0] ? await postServices.uploadFile(data.image[0]) : null;
                if (file) {
                    console.log("file upload working")
                    postServices.deleteFile(post.featuredImage);
            }
            console.log("not find file yet")
           const dbPost =  await postServices.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });
            if(dbPost)
          {
            console.log("Post Updated Successfully");
            navigate(`/post/${post.$id}`);
        }
            }
            
        }



    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")
                .substring(0,35);
    }, []);

    

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                {/* Content is here */}
                <Input
                 label="Content :"
                 placeholder="content"
                 className="mb-4"
                 {...register("content", { required: true })}
                />

            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image")}
                />
                {post ? (
                    <div className="w-full mb-4">
                        <img
                            src={postServices.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                ) : null}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" className="w-full">
                    {post ? "Edit" : "Submit"}
                </Button>
            </div>
        </form>
    );
}