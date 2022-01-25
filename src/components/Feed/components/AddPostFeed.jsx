import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisFile } from "react-moralis";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useState } from "react";
import { message, Button, Form, Input, Upload, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddPost = () => {
  const { contractABI, contractAddress } = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);
  const ipfsProcessor = useMoralisFile();
  const contractProcessor = useWeb3ExecuteFunction();
  const [content, setContent] = useState("");
  const [file, setFile] = useState();
  const { TextArea } = Input;

  const normFile = (e) => {
    if (Array.isArray(e)) {
      setFile(e.fileList[0].originFileObj);
      return e;
    }
    setFile(e.fileList[0].originFileObj);
    return e && e.fileList;
  };

  async function addPost(post) {
    const contentUri = await processContent(post);
    const options = {
      contractAddress: contractAddress,
      functionName: "createPost",
      abi: contractABIJson,
      params: {
        _parentId: "0x93",
        _contentUri: contentUri,
        _categoryId: "0x93",
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
      content: content,
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

  const validateForm = () => {
    let result = !content ? false : true;
    return result;
  };

  const clearForm = () => {
    setContent("");
    setFile("");
  };

  function onSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      return message.error(
        "Remember to add the title and the content of your post"
      );
    }
    addPost({ content });
    clearForm();
  }

  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      style={{ width: "620px", maxWidth: "auto" }}
      autoComplete='off'
    >
      <Form.Item
        rules={[
          {
            required: true,
            message: "Remember to add the content of your comment",
          },
        ]}
      >
        <TextArea
          bordered={false}
          showCount
          maxLength={200}
          style={{ width: "auto", maxWidth: "auto" }}
          type='text'
          placeholder="What's on your mind ..."
          autoSize={{ minRows: 2, maxRows: 5 }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Item>
      <Row>
        <Col span={21}>
          <Form.Item
            name='dragger'
            valuePropName='fileList'
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload listType='picture' maxCount={1}>
              <Button
                icon={<PlusOutlined />}
                style={{
                  borderRadius: "0.5rem",
                  display: "inline",
                }}
              >
                Image
              </Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={1}>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              onClick={onSubmit}
              style={{
                borderRadius: "0.5rem",
              }}
            >
              Post
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddPost;
