"use client";

import React, { useRef, useState } from "react";
import Layout from "../components/layout";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl, 
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFile } from "@/lib/actions/file";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { Camera } from "lucide-react"; 
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
/**
 * ImageKIt
 */
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/imagekit");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const onError = (err: any) => {
  console.log("Error", err);
};
/**  END */

const FormSchema = z.object({
  filename: z.string().min(2, {
    message: "filename must be at least 2 characters.",
  }),
  url: z.string().min(2, {
    message: "Url must be at least 2 characters.",
  }),
  fileid: z.string().min(2, {
    message: "Url must be at least 2 characters.",
  }),
});


const Page = () => {
  const ikUploadRefTest = useRef<HTMLInputElement | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      filename: "",
      url: "",
      fileid: "",
    },
  });

  const { formState } = form;

  const onUploadProgress = (event: ProgressEvent) => {
    if (event.lengthComputable) {
      const progressPercentage = Math.round((event.loaded / event.total) * 100);
      setProgress(progressPercentage); // Perbarui progress bar
    }
  };

  const onUploadStart = (evt: any) => {
    console.log("Start", evt);
    setUploading(true); // Mulai proses upload
    setProgress(0); // Reset progress bar
  };
  const onSuccess = (res: any) => {
    console.log("Success", res);
    setUploadedImageUrl(res.thumbnailUrl);
    form.setValue("filename", res.name);
    form.setValue("url", res.url);
    form.setValue("fileid", res.fileId);
    setUploading(false);
    setProgress(100);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    
    console.log("Submit", data);

    const result = await createFile(data);
    if (result.success) {
      toast({
        title: "Success",
        description: "File created successfully",
      });
      //router.push(`/admin/books/${result.data.id}`);
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    form.reset();
    setUploadedImageUrl(null);
  }

  return (
    <Layout>
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="w-full xl:w-2/5">
          <Card className="pb-4">
            <CardHeader>
              <CardTitle>Upload File</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="filename"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormLabel>Filename</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl> 
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem className="hidden"> 
                        <FormControl>
                          <Input  
                            {...field}
                          />
                        </FormControl>  
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fileid"
                    render={({ field }) => (
                      <FormItem className="hidden"> 
                        <FormControl>
                          <Input  
                            {...field}
                          />
                        </FormControl>  
                      </FormItem>
                    )}
                  />
                  <Avatar className="w-40 h-40">
                    {uploadedImageUrl && (
                      <AvatarImage src={uploadedImageUrl} alt="@shadcn"/>
                    )}

                    <AvatarFallback>
                       {formState.errors.filename?.message ? (
                          <span className="text-red-500 text-sm text-center p-2">
                            {formState.errors.filename.message}
                          </span>
                        ) : (
                          "Fallback Image"
                        )}
                      </AvatarFallback> 
                  </Avatar>

                  {/* Progress Bar */}
                  {uploading && (
                    <div className="w-full bg-gray-600 rounded flex">
                      <div
                        className="bg-blue-500 text-xs leading-none py-1 text-center text-gray-400 rounded"
                        style={{ width: `${progress}%` }}
                      >
                        {progress}%
                      </div>
                    </div>
                  )}

                  <div className="flex">
                    <ImageKitProvider
                      publicKey={publicKey}
                      urlEndpoint={urlEndpoint}
                      authenticator={authenticator}
                    >
                      <IKUpload
                        // fileName="test-upload.jpg"
                        isPrivateFile={false}
                        useUniqueFileName={true}
                        validateFile={(file) => file.size < 2000000}
                        onError={onError}
                        onSuccess={onSuccess}
                        onUploadProgress={onUploadProgress}
                        onUploadStart={onUploadStart}
                        style={{ display: "none" }} // hide the default input and use the custom upload button
                        ref={ikUploadRefTest}
                      />

                      <div className="flex">
                      {ikUploadRefTest && uploadedImageUrl == null && (
                          <Button
                            className="bg-slate-200"
                            onClick={() => ikUploadRefTest.current?.click()}
                          >
                            <Camera /> Upload
                          </Button>
                        )}
                      {/* {uploadedImageUrl && (
                        <div className="flex"> 
                          <IKImage
                            src={uploadedImageUrl} // Tampilkan URL gambar
                            width="200"
                            height="200"
                            alt="Uploaded Image"
                          />
                        </div>
                      )} */}
                      </div>
                    </ImageKitProvider>
                    {/* ...other SDK components added previously */}
                  </div>

                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
