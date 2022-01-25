import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisFile, useWeb3ExecuteFunction } from "react-moralis";
import { useState } from "react";
import { message, Input } from "antd";
import { UserOutlined, CloudUploadOutlined } from "@ant-design/icons";

const AddPost = () => {
  const { contractABI, contractAddress } = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);
  const ipfsProcessor = useMoralisFile();
  const contractProcessor = useWeb3ExecuteFunction();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState();
  const { TextArea } = Input;

  async function addPost(post) {
    const contentUri = await processContent(post);
    const categoryId = "0x92";
    const options = {
      contractAddress: contractAddress,
      functionName: "createPost",
      abi: contractABIJson,
      params: {
        _parentId: "0x92",
        _contentUri: contentUri,
        _categoryId: categoryId,
      },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => message.success("success"),
      onError: (error) => message.error(error),
    });
  }

  const processContent = async () => {
    const imageUrl = file !== undefined ? await processImage(file) : undefined;

    const params = {
      title: encodeURIComponent(title),
      content: encodeURIComponent(content),
      image: imageUrl,
    };
    const ipfsResult = await ipfsProcessor.saveFile(
      "post.json",
      { base64: btoa(JSON.stringify(params)) },
      { saveIPFS: true }
    );
    return ipfsResult._ipfs;
  };

  const processImage = async () => {
    const ipfsResult = await ipfsProcessor.saveFile("image.jpg", file, {
      type: "image/jpeg",
      saveIPFS: true,
    });
    return ipfsResult._ipfs;
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    setFile("");
  };

  function onSubmit(e) {
    e.preventDefault();
    addPost({ title, content });
    clearForm();
  }
  const suffix = (
    <CloudUploadOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  return (
    <form onSubmit={onSubmit}>
      <div className='row'>
        <div className='form-group'>
          <Input
            prefix={<UserOutlined />}
            showCount
            maxLength={20}
            type='text'
            className='mb-2 mt-2 form-control'
            placeholder='Name'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            autoSize={{ minRows: 1, maxRows: 1 }}
            maxLength={20}
            type='text'
            className='mb-2 form-control'
            placeholder='Bio'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Input
            type='file'
            className='mb-2 form-control'
            suffix={suffix}
            value={null}
            onChange={async (e) => setFile(e.target.files[0])}
          />
        </div>
        <button type='submit' className='btn btn-dark '>
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddPost;
