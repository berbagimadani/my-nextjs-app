"use client";

import { useRouter } from "next/navigation"; 
import React, { useRef, useState } from "react";
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
import { createFile } from "@/lib/actions/createfile";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { Camera } from "lucide-react";
import { useDataContext } from "@/context/DataContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


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
    message: "Please uploaded image",
  }),
  url: z.string().min(2, {
    message: "Url must be at least 2 characters.",
  }),
  fileid: z.string().min(2, {
    message: "Url must be at least 2 characters.",
  }),
});

const CreateFile = () => {
  const ikUploadRefTest = useRef<HTMLInputElement | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>("/");
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const { addItem } = useDataContext();
  const router = useRouter();

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
   
    const result = await createFile(data);
    if (result.success) {
      toast({
        title: "Success",
        description: "File created successfully",
      });

      addItem({
        id: Date.now(),
        filename: data.filename,
        url: data.url,
        fileid: data.fileid,
      });
       
      await fetch(`/api/revalidate?path=/files`, {
        method: "GET",
      });
      
      router.push(`files?cache=false`); 

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
    setUploadedImageUrl("/");
  }

  return (
    <div className="">
      <Card className="p-6 justify-center items-center flex flex-col">
        <CardHeader className="p-0">
          <CardTitle>Upload File</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex">
          {/* <button onClick={() => addItem({ id: Date.now(), filename: "aa", url: "ssss", fileid: "ssssss" })}>
          Update State
        </button> */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex flex-col border p-2 gap-2">
                <Avatar className="w-40 h-40 rounded-none">
                  <AvatarImage
                    src={uploadedImageUrl ? uploadedImageUrl : "/"}
                    alt="@shadcn"
                  />
                  <AvatarFallback className="rounded-none">
                    {formState.errors.filename?.message ? (
                      <span className="text-red-500 text-sm text-center p-2">
                        {formState.errors.filename.message}
                      </span>
                    ) : (
                      "Fallback Image"
                    )}
                  </AvatarFallback>
                </Avatar>
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

                  <div className="flex justify-center w-full">
                    {ikUploadRefTest && uploadedImageUrl == "/" && (
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

              <div className="pt-5 justify-end flex">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateFile;
