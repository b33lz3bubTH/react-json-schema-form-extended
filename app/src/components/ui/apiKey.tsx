import React, { useState } from "react";
import { Modal, Input, Button } from "antd";

interface ApiKeyModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [apiKey, setApiKey] = useState<string>("");

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleSaveApiKey = () => {
    onSave(apiKey);
  };

  return (
    <Modal
      title="Set API Key"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSaveApiKey}>
          Save
        </Button>,
      ]}
    >
      <Input
        placeholder="Enter your API Key"
        value={apiKey}
        onChange={handleApiKeyChange}
      />
    </Modal>
  );
};

export default ApiKeyModal;
