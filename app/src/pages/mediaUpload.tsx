
import {
  RJSFSchema,
  // RegistryFieldsType,
  // RegistryWidgetsType,
  UiSchema,
} from "@rjsf/utils";
import Form from "@rjsf/bootstrap-4";
import validator from "@rjsf/validator-ajv8";
import Api from "../api";
import { useState } from "react";
import { fields } from "../form/fields";

export function MediaUploadForm() {


  const schema: RJSFSchema = {
    title: "Product Form",
    type: "object",
    properties: {
      owner: {
        type: "string",
        title: "Owner",
        default: "GlobalJini.com",
      },
      name: {
        type: "string",
        title: "Product Name",
      },
      available: {
        type: "boolean",
        title: "Available",
      },
      mrp: {
        type: "number",
        title: "MRP",
      },
      medias: {
        type: "array",
        title: "Product Media",
        items: {
          type: "object",
          properties: {
            url: { type: "string", title: "URL", format: "uri" },
            mime: { type: "string", title: "MIME Type" },
            size: { type: "number", title: "Size" },
            originalFileName: { type: "string", title: "Original File Name" },
          },
        },
      },
      specifications: {
        type: "array",
        title: "Specifications",
        items: {
          type: "object",
          properties: {
            feature: {
              type: "string",
              title: "Feature",
            },
            value: {
              type: "string",
              title: "Value",
            },
          },
        },
      },
      product_select_options: {
        type: "array",
        title: "Product Select Options",
        items: {
          type: "object",
          properties: {
            option_name: {
              type: "string",
              title: "Option Name",
            },
            option_values: {
              type: "array",
              title: "Option Values",
              items: {
                type: "object",
                properties: {
                  label: {
                    type: "string",
                    title: "Label",
                  },
                  available: {
                    type: "boolean",
                    title: "Available",
                  },
                  medias: {
                    type: "array",
                    title: "Product Options Media",
                    items: {
                      type: "object",
                      properties: {
                        url: { type: "string", title: "URL", format: "uri" },
                        mime: { type: "string", title: "MIME Type" },
                        size: { type: "number", title: "Size" },
                        originalFileName: {
                          type: "string",
                          title: "Original File Name",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      selling_price: {
        type: "number",
        title: "Selling Price",
      },
      description: {
        type: "string",
        title: "Description",
      },
      brand_id: {
        type: "string",
        title: "Brand",
      },
      dimensions: {
        type: "object",
        title: "Dimensions",
        properties: {
          width: {
            type: "string",
            title: "Width",
          },
          length: {
            type: "string",
            title: "Length",
          },
          height: {
            type: "string",
            title: "Height",
          },
        },
      },
      material: {
        type: "string",
        title: "Material",
      },
      size: {
        type: "string",
        title: "Size",
        default: "not_applicable",
      },
      tags: {
        type: "array",
        title: "Tags",
        items: {
          type: "string",
        },
      },
    },
    required: [
      "name",
      "description",
      "tags",
      "brand_id",
    ],
  };


  const uiSchema: UiSchema = {
    description: {
      "ui:field": "EditorField",
    },

    medias: {
      "ui:field": "FileUploadField", // Use the custom component
      "ui:options": {
        allowedTypes: ["image/jpeg", "image/png", "video/mp4"], // Specify the allowed file types
        uploadLocation: Api.MediaUpload(),
        apiKey: "------ API ---- KEY",
      },
    },

    product_select_options: {
      items: {
        option_values: {
          items: {
            medias: {
              "ui:field": "FileUploadField",
              "ui:options": {
                allowedTypes: ["image/jpeg", "image/png", "video/mp4"],
                uploadLocation: Api.MediaUpload(),
                apiKey: "------ API ---- KEY",
              },
            },
          },
        },
      },
    },
    brand_id: {
      "ui:field": "AsyncSelectWidget",
      "ui:options": {
        api: Api.BrandsList,
        searchKey: "_id",
        labelKey: "name",
        valueKey: "_id",
      },
    },
  };


  const [formData, setFormData] = useState({});
  const onSubmit = (data: any) => {

    console.log(`data: `, data);
  };
  return (
    <div className="w-100">
      <h1>Media Upload Example</h1>

      <Form
        schema={schema}
        formData={formData}
        validator={validator}
        onSubmit={onSubmit}
        uiSchema={uiSchema}
        fields={fields as any}
        onChange={({ formData }) => setFormData(formData)}
      />
    </div>
  )
}
