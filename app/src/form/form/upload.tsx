
import { Group, Text, useMantineTheme, rem, CloseButton } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { WidgetProps } from "@rjsf/utils";
import { useEffect, useState } from "react";
import { useId } from "@mantine/hooks";

interface FileObject {
  url: string;
  mime: string;
  size: number;
  originalFileName: string;
}

interface MultiFileUploadProps {
  id: string;
  formData: FileObject[];
  uiSchema: {
    "ui:field": string;
    "ui:options": {
      allowedTypes: string[];
      uploadLocation: string;
      apiKey: string;
    };
  };
  onChange: (updatedData: FileObject[]) => void;
  allowedTypes?: string[];
}

function ImageViewer(props: {
  url: string;
  idx: number;
  mime: string;
  fileName: string;
  onDelete: () => void;
}) {
  console.log(`ImageViewer: `, props.url);
  return (
    <div
      style={{ position: "relative", float: "left" }}
      key={useId(props.idx.toString())}
    >
      {props?.mime?.startsWith("image") ? (
        <img
          src={props.url}
          style={{ height: "10vh", margin: 5, objectFit: "contain" }}
        />
      ) : (
        <div>{props.fileName}</div>
      )}

      <CloseButton
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          background: "rgba(255,0,0,0.3)",
        }}
        onClick={props.onDelete}
        aria-label="Close modal"
      />
    </div>
  );
}

export function FileUploadField(props: MultiFileUploadProps) {
  const theme = useMantineTheme();

  const [files, setFiles] = useState<FileObject[]>(props.formData ?? []);
  const [loading, setLoading] = useState(false);

  const handleFileUploads = async (ufiles: FileWithPath[]) => {
    const server_data: FileObject[] = [];
    setLoading(true);
    try {
      for (const file of ufiles) {
        const body = new FormData();
        body.append("file", file);
        const response = await fetch(
          props.uiSchema["ui:options"].uploadLocation,
          {
            method: "POST",
            body,
            headers: {
              "x-key": props.uiSchema["ui:options"].apiKey,
            },
          }
        ).then((res) => res.json());
        const mediaUpload = response?.uploaded_data?.[0];
        server_data.push({
          mime: mediaUpload.mimetype,
          originalFileName: mediaUpload.originalname,
          size: mediaUpload.size,
          url: mediaUpload.Location,
        });
      }
      const updated_Files = [...files, ...server_data];
      setFiles(updated_Files);
      props.onChange(updated_Files);
      setLoading(false);
    } catch (err: unknown) {
      // trigger notification
      setLoading(false);
    }
  };
  const handleFileDelete = (idx: number) => {
    const new_files: FileObject[] = [...files];
    new_files.splice(idx, 1);
    setFiles(new_files);
    props.onChange(new_files);
  };
  return (
    <>
      <Dropzone
        onDrop={(files) => handleFileUploads(files)}
        onReject={(files) => console.log("rejected files", files)}
        accept={props.uiSchema["ui:options"].allowedTypes}
        loading={loading}
        //   {...props.dropZoneProps}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: rem(220), pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      <div>
        {files.map((file, idx: number) => (
          <ImageViewer
            url={file.url}
            fileName={file.originalFileName}
            mime={file.mime}
            idx={idx}
            key={idx}
            onDelete={() => handleFileDelete(idx)}
          />
        ))}
      </div>
    </>
  );
}
