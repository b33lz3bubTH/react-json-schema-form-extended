import { RJSFSchema, UiSchema } from "@rjsf/utils";
import Form from "@rjsf/bootstrap-4";
import validator from "@rjsf/validator-ajv8";
import { fields } from "../../components/widgets/fields";
import { createProduct } from "../../redux/slice/product/createProduct.slice";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/slice/product/listProduct.slice";
import { PropertyTypeOptions } from "../../common/data/constants/propertyType.list";
import { ConstructionStatusOptions } from "../../common/data/constants/constructionStatus.list";

import { RootState } from "../../redux/store";
import Api from "../../api";
import { useState } from "react";

export function ProductForm() {
  const apiKey = useSelector((state: RootState) => state.auth.apiKey);
  const schema: RJSFSchema = {
    title: "Property Listing Form",
    type: "object",
    properties: {
      brand_id: {
        title: "Brands",
        type: "string",
        description: "By Default it shows few brands, and its also searchable."
      },
      name: {
        title: "Title",
        type: "string",
        description: "Normal Input Field"
      },
      postDescription: {
        type: "string",
        title: "Post Description",
      },
      available: {
        title: "Is This For Sale",
        type: "boolean",
      },
      askingPrice: {
        title: "Asking Price",
        type: "string",
      },
      area: {
        title: "Area",
        type: "string",
      },
      pincode: {
        title: "Pincode",
        type: "string",
      },
      constructionStatus: {
        title: "Construction Status",
        type: "string",
      },
      facilities: {
        title: "facilities",
        type: "array",
        items: {
          type: "string",
        },
      },
      medias: {
        type: "array",
        title: "Product Media",
        items: {
          type: "object",
          properties: {
            url: { type: "string", title: "URL" },
            mime: { type: "string", title: "MIME Type" },
            size: { type: "number", title: "Size" },
            originalFileName: { type: "string", title: "Original File Name" },
          },
        },
      },
      tags: {
        type: "array",
        title: "Product Tags",
        items: {
          type: "string",
        },
      },
    },
    required: ["name", "postDescription"],
  };

  const uiSchema: UiSchema = {
    postDescription: {
      "ui:field": "EditorField",
    },

    available: {
      "ui:widget": "checkbox",
      "ui:options": {
        inline: true, // Display the checkbox inline
      },
    },
    propertyType: {
      "ui:field": "SelectFieldWidget",
      "ui:options": {
        options: PropertyTypeOptions,
        defaultValue: "",
      },
    },
    constructionStatus: {
      "ui:field": "SelectFieldWidget",
      "ui:options": {
        options: ConstructionStatusOptions,
        defaultValue: "",
      },
    },
    medias: {
      "ui:field": "FileUploadField", // Use the custom component
      "ui:options": {
        allowedTypes: ["image/jpeg", "image/png", "video/mp4"], // Specify the allowed file types
        uploadLocation: Api.MediaUpload(),
        apiKey,
      },
    },
    brochure: {
      "ui:field": "FileUploadField", // Use the custom component
      "ui:options": {
        allowedTypes: ["application/pdf"], // Specify the allowed file types
        uploadLocation: Api.MediaUpload(),
        apiKey,
      },
    },
    sitePlan: {
      "ui:field": "FileUploadField", // Use the custom component
      "ui:options": {
        allowedTypes: ["image/jpeg", "image/png", "video/mp4"], // Specify the allowed file types
        uploadLocation: Api.MediaUpload(),
        apiKey,
      },
    },

    brand_id: {
      "ui:field": "AsyncSelectWidget",
      "ui:options": {
        api: Api.BrandsListing,
        searchKey: "_id",
        labelKey: "name",
        valueKey: "_id",
      },
    },
  };

  const [formData, setFormData] = useState<any>({
    available: false,
  });
  const dispatch = useDispatch<any>();

  const onSubmit = (data: any) => {
    console.log(data);
   // dispatch(createProduct(data.formData)).then(() => {
     // setFormData({ available: false });
     // dispatch(listProducts({ take: 10, skip: 0, filter: {} }));
    //});
  };
  return (
    <div className="container">
      <Form
        schema={schema}
        formData={formData}
        validator={validator}
        onSubmit={onSubmit}
        uiSchema={uiSchema}
        fields={fields as any}
      />
    </div>
  );
}
