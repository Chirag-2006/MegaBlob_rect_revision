import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../config/config";

function RTE({ name, control, label, rules = {}, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1">
          {label}{" "}
          {rules?.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Controller
        name={name || "content"}
        control={control}
         rules={rules}
        render={({ field: { onChange } }) => (
          <>
            <Editor
              apiKey={config.tinymceKey}
              initialValue={defaultValue}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={onChange}
            />
            {/* ✅ ERROR SHOW KARO
            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )} */}
          </>
        )}
      />
    </div>
  );
}

export default RTE;
